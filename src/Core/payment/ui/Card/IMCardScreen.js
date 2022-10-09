import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Alert, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Appearance } from 'react-native-appearance';
import stripe from 'tipsi-stripe';
import { firebaseUser } from '../../../firebase';
import PaymentRequestAPI from '../../api';
import PaymentMethodDataManager from '../../../firebase/paymentMethods';
import {
  updatePaymentMethods,
  setSelectedPaymentMethod,
} from '../../redux/checkout';
import { setUserData } from '../../../onboarding/redux/auth';
import dynamicStyles from './styles';
import Button from 'react-native-button';
import { IMLocalized } from '../../../localization/IMLocalization';
import Icon from 'react-native-vector-icons/Ionicons';

const COLOR_SCHEME = Appearance.getColorScheme();

function CardScreen(props) {
  const appStyles = props.route.params.appStyles;
  const appConfig = props.route.params.appConfig;

  const styles = dynamicStyles(appStyles);

  const dispatch = useDispatch();
  const paymentMethods = useSelector((state) => state.checkout.paymentMethods);
  const currentUser = useSelector((state) => state.auth.user);
  const shippingAddress = useSelector(
    (state) => state.checkout.shippingAddress,
  );

  const [selectedMethodTitle, setSelectedMethodTitle] = useState('Google Pay');
  const paymentMethodDataManager = useRef(
    new PaymentMethodDataManager(appConfig),
  );
  const paymentRequestAPI = useRef(new PaymentRequestAPI(appConfig));
  const stripeCustomerID = useRef(null);

  const options = {
    requiredBillingAddressFields: 'full',
    prefilledInformation: {
      billingAddress: {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        line1: `${shippingAddress.line1}`,
        line2: `${shippingAddress.line2}`,
        city: `${shippingAddress.city}`,
        state: `${shippingAddress.state}`,
        country: `${shippingAddress.country}`,
        postalCode: `${shippingAddress.postalCode}`,
      },
    },
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: null,
    });
  }, [props.navigation]);

  useEffect(() => {
    setStripeCustomerId();

    // const unsubscribePaymentMethods = paymentMethodDataManager.current.subscribePaymentMethods(
    //   currentUser.id,
    //   setPaymentMethods,
    // );

    // return () => {
    //   unsubscribePaymentMethods && unsubscribePaymentMethods();
    // };

    fetchAndUpdatePaymentMethods();
  }, []);

  const setStripeCustomerId = async () => {
    const customerID = await retrieveStripeCustomerId();
    stripeCustomerID.current = customerID;
  };

  const retrieveStripeCustomerId = async () => {
    if (stripeCustomerID.current) {
      return stripeCustomerID.current;
    }

    if (currentUser.stripeCustomerID) {
      return currentUser.stripeCustomerID;
    }

    const response = await paymentRequestAPI.current.getStripeCustomerID(
      currentUser.email,
    );

    if (response) {
      stripeCustomerID.current = response;
      firebaseUser.updateUserData(currentUser.id, {
        stripeCustomerID: response,
      });
      dispatch(
        setUserData({
          user: { ...currentUser, stripeCustomerID: response },
        }),
      );

      return stripeCustomerID.current;
    }
    return null;
  };

  const cardPay = async () => {
    const paymentMethod = await stripe.paymentRequestWithCardForm(options);
    const customerID = await retrieveStripeCustomerId();
    attachPaymentMethodtoCustomer(paymentMethod, customerID);
  };

  const attachPaymentMethodtoCustomer = async (paymentMethod, customerID) => {
    const response = await paymentRequestAPI.current.attachPaymentMethod(
      paymentMethod.id,
      customerID,
    );

    if (response.success === true) {
      fetchAndUpdatePaymentMethods();
    } else {
      alert(IMLocalized(response?.stripeError?.data?.error));
    }
  };

  const detachPaymentMethodfromCustomer = async (paymentMethod) => {
    const response = await paymentRequestAPI.current.detachPaymentMethod(
      paymentMethod.paymentMethodId,
    );

    if (response.success === true) {
      fetchAndUpdatePaymentMethods();
    } else {
      alert(IMLocalized('Failed to remove card. Please try again.'));
    }
  };

  const fetchAndUpdatePaymentMethods = async () => {
    const stripecustomerId = await retrieveStripeCustomerId(); //currentUser.stripeCustomerID;
    const response = await paymentRequestAPI.current.getPaymentMethods(
      stripecustomerId,
    );
    const stripePaymentMethods = response.data['paymentMethods']['data'];

    setPaymentMethods(stripePaymentMethods);
  };

  const addToken = async (token) => {
    const customerID = await retrieveStripeCustomerId();
    if (!token) {
      return;
    }

    if (customerID) {
      const source = await paymentRequestAPI.current.addNewPaymentSource(
        customerID,
        token.tokenId,
      );

      onUpdatePaymentMethod(token, source);
    }
  };

  const onUpdatePaymentMethod = (token, source) => {
    onFirebaseUpdatePaymentMethod(token, source);
  };

  const removeFromPaymentMethods = async (method) => {
    const customerID = await retrieveStripeCustomerId();

    if (!customerID) {
      return;
    }

    const result = await paymentRequestAPI.current.deletePaymentSource(
      customerID,
      method.cardId,
    );

    if (result.data?.response?.deleted) {
      onRemoveFromPaymentMethods(method);
    }
  };

  onPaymentMethodLongPress = (method) => {
    if (method.isNativePaymentMethod) {
      return;
    }
    Alert.alert(
      IMLocalized('Remove card'),
      IMLocalized('This card will be removed from payment methods.'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => detachPaymentMethodfromCustomer(method),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
        },
      ],
      { cancelable: true },
    );
  };

  const onRemoveFromPaymentMethods = (method) => {
    paymentMethodDataManager.current.deleteFromUserPaymentMethods(
      method.cardId,
    );
  };

  const onFirebaseUpdatePaymentMethod = async (token, source) => {
    if (source.success && source.data.response) {
      paymentMethodDataManager.current.updateUserPaymentMethods({
        ownerId: currentUser.id,
        card: token.card,
      });
      paymentMethodDataManager.current.savePaymentSource(
        currentUser.id,
        source.data.response,
      );
    } else {
      console.log(source, token);
      Alert.alert(
        IMLocalized('Något gick fel'),
        IMLocalized(
          'Kortet lades inte till. Transaktionen nekades. Vänligen använd en annan betalningsmetod eller kontakta din bank.',
        ),
      );
    }
  };

  const setPaymentMethods = (methods) => {
    dispatch(updatePaymentMethods(methods));
  };

  const renderItem = (imgSource, text, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <FastImage
            tintColor={'#000'}
            style={styles.visaIcon}
            source={imgSource}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.cardText}>{text}</Text>
            <Icon name="chevron-forward-outline" color="black" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onPaymentMethodPress = (index, item) => {
    setSelectedMethodTitle(item.title.toString());
    dispatch(setSelectedPaymentMethod(item));
  };

  const renderCard = (item, index) => {
    return (
      <View key={item?.cardId || index}>
        <TouchableOpacity
          onLongPress={() => onPaymentMethodLongPress(item)}
          onPress={() => onPaymentMethodPress(index, item)}>
          <View style={styles.itemContainer}>
            <FastImage style={styles.tick} source={item.iconSource} />
            <Text style={styles.cardText}>{item.title}</Text>
            {selectedMethodTitle === item.title && (
              <FastImage
                source={require('../../../../CoreAssets/tick.png')}
                tintColor={'#12DA00'}
                style={styles.tick}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <FastImage
        source={require('../../../../CoreAssets/cardimage.png')}
        style={styles.cardImage}
        resizeMode="contain"
        tintColor={appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor}
      /> */}
      <View style={styles.line} />
      {/*/renderNativePayButton()*/}
      {paymentMethods.map((item, index) => renderCard(item, index))}
      <View style={styles.line} />
      {renderItem(
        require('../../../../CoreAssets/add.png'),
        IMLocalized('Lägg till betal- eller kreditkort'),
        cardPay,
      )}
      <Button
        containerStyle={styles.actionButtonContainer}
        onPress={() =>
          props.navigation.navigate('Checkout', { appStyles, appConfig })
        }
        style={styles.actionButtonText}>
        {IMLocalized('Fortsätt')}
      </Button>
    </View>
  );
}

export default CardScreen;
