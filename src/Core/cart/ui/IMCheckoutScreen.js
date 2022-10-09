import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Button from 'react-native-button';
import { useSelector, useDispatch } from 'react-redux';
import stripe from 'tipsi-stripe';
import { firebaseUser } from '../../firebase';
import PaymentRequestAPI from '../../payment/api';
import CartAPIManager from '../api/CartAPIManager';
import { overrideCart } from '../redux/actions';
import { setUserData } from '../../onboarding/redux/auth';
import dynamicStyles from './styles';
import { IMPlacingOrderModal } from '../../delivery/IMPlacingOrderModal/IMPlacingOrderModal';
import { IMLocalized } from '../../localization/IMLocalization';
import { TouchableOpacity } from 'react-native-gesture-handler';

function IMCheckoutScreen(props) {
  const appStyles = props.route.params.appStyles;
  const appConfig = props.route.params.appConfig;
  const styles = dynamicStyles(appStyles);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth.user);
  const cartVendor = useSelector((state) => state.cart.vendor);
  const selectedPaymentMethod = useSelector(
    (state) => state.checkout.selectedPaymentMethod,
  );
  const shippingAddress = useSelector(
    (state) => state.checkout.shippingAddress,
  );

  const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [price, setPrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(5);
  const [deliveryPrice, setDeliveryPrice] = useState(49);
  const [deliveryOption, setDeliveryOption] = useState('delivery');

  const paymentRequestAPI = useRef(new PaymentRequestAPI(appConfig));
  const apiManager = useRef(new CartAPIManager(appConfig));

  useEffect(() => {
    if (cartItems?.length > 0) {
      const newPrice = cartItems.reduce(
        (prev, next) => prev + next.price * next.quantity,
        0,
      );
      setPrice(newPrice);
    }
  }, [cartItems]);

  const handleNativePay = async (stripeCustomerID) => {
    const options = {
      requiredBillingAddressFields: ['all'],
      billing_address_required: false,
      total_price: `${getTotalPrice}`,
      currency_code: 'SEK',
      shipping_countries: ['SE'], //android
      line_items: [
        {
          currency_code: 'SEK',
          description: 'Pay now',
          unit_price: `${getTotalPrice}`,
          total_price: `${getTotalPrice}`,
          quantity: '1',
        },
      ],
    };

    const items = [
      {
        label: 'Pay now',
        amount: `${getTotalPrice}`,
      },
    ];
    const token = await stripe.paymentRequestWithNativePay(options, items);

    if (!token.tokenId) {
      return;
    }

    const source = await paymentRequestAPI.current.addNewPaymentSource(
      stripeCustomerID,
      token.tokenId,
    );

    if (!source?.data?.response?.id) {
      alert(IMLocalized('An error occurred, please try again later'));
      return;
    }

    const stripeResponse = await completePayment(
      stripeCustomerID,
      source.data.response.id,
    );

    if (stripeResponse.success && stripeResponse?.data?.response?.id) {
      persistOrder();
      return;
    }
    alert(IMLocalized('Transaction failed, please select another card'));
  };

  const setStripeCustomerId = async () => {
    let stripeCustomerID = currentUser.stripeCustomerID;
    if (!stripeCustomerID) {
      const response = await paymentRequestAPI.current.getStripeCustomerID(
        currentUser.email,
      );

      stripeCustomerID = response;
      firebaseUser.updateUserData(currentUser.id, {
        stripeCustomerID: response,
      });
      dispatch(
        setUserData({
          user: { ...currentUser, stripeCustomerID: response },
        }),
      );

      return stripeCustomerID;
    }

    return stripeCustomerID;
  };

  const persistOrder = async () => {
    await apiManager.current.placeOrder(
      cartItems,
      currentUser,
      shippingAddress,
      cartVendor,
      deliveryOption,
      () => {
        setPlaceOrderVisible(false);
        dispatch(overrideCart([]));
        props.navigation.navigate('OrderList');
      },
    );
  };

  const completePayment = async (stripeCustomerID, source) => {
    return await apiManager.current.chargeCustomer({
      customer: stripeCustomerID,
      currency: 'sek',
      amount: getTotalPrice * 100,
      source: source,
    });
  };

  const handleNonNativePay = async (stripeCustomerID) => {
    const stripeResponse = await completePayment(
      stripeCustomerID,
      selectedPaymentMethod.cardId,
    );

    if (stripeResponse.success && stripeResponse?.data?.response?.id) {
      persistOrder();
      return;
    }
    alert(IMLocalized('Transaction failed, please select another card'));
  };

  const placeOrder = async () => {
    setPlaceOrderVisible(true);

    const stripeCustomerID = await setStripeCustomerId();

    if (!stripeCustomerID) {
      alert(IMLocalized('An error occurred, please try again later'));
      return;
    }

    if (selectedPaymentMethod.isNativePaymentMethod) {
      handleNativePay(stripeCustomerID);
    } else {
      handleNonNativePay(stripeCustomerID);
    }
  };

  const placeOrder3DS = async () => {
    setPlaceOrderVisible(true);

    const stripeCustomerID = await setStripeCustomerId();

    if (!stripeCustomerID) {
      alert(IMLocalized('An error occurred, please try again later'));
      return;
    }

    if (!selectedPaymentMethod.paymentMethodId) {
      alert(IMLocalized('Please select payment method'));
      return;
    }

    const stripeResponse = await apiManager.current.createPaymentIntent({
      customerId: stripeCustomerID,
      paymentMethodId: selectedPaymentMethod.paymentMethodId,
      amount: (price + deliveryPrice + serviceCharge)?.toFixed(2) * 100,
    });

    const { status, client_secret, payment_intent_id } = stripeResponse?.data;

    if (status === 'requires_action') {
      let authResponse;
      try {
        authResponse = await stripe.authenticatePaymentIntent({
          clientSecret: client_secret,
        });
      } catch (error) {
        alert(
          IMLocalized(
            'Your security check failed. Please try another payment method',
          ),
        );
        return;
      }

      if (authResponse.status === 'requires_payment_method') {
        alert(
          IMLocalized('Your payment failed. Please try another payment method'),
        );
        return;
      } else if (authResponse.status === 'requires_confirmation') {
        // SCA passed successfully. Make API call to confirm paymentIntent
        console.log(
          'API call to confirm paymentIntent ',
          selectedPaymentMethod.paymentMethodId,
        );
        const confirmPaymentIntentResponse = await apiManager.current.confirmPaymentIntent(
          {
            id: payment_intent_id,
          },
        );

        if (confirmPaymentIntentResponse.data.status == 'succeeded') {
          persistOrder();
          return;
        } else {
          alert(
            IMLocalized(
              'Your payment failed. Please try another payment method',
            ),
          );
        }
      }
    } else if (status == 'succeeded') {
      persistOrder();
      return;
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <View />,
    });
  });

  function renderCartItems(item) {
    return (
      <View style={styles.CartFlexBox}>
        <View style={styles.rowContainer} key={item.id}>
          <Text style={styles.count}>
            {item.quantity}
            {'  '}x
          </Text>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </View>
    );
  }

  const onPickUpAction = () => {
    setDeliveryOption('pickUp');
    setDeliveryPrice(0);
  };

  const onDeliveryAction = () => {
    setDeliveryOption('delivery');
    setDeliveryPrice(49);
  };

  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.checkoutTitle}>{IMLocalized('Pay')}</Text> */}
        {placeOrderVisible && (
          <IMPlacingOrderModal
            onCancel={() => setPlaceOrderVisible(false)}
            cartItems={cartItems}
            shippingAddress={shippingAddress}
            appStyles={appStyles}
            isVisible={true}
            user={currentUser}
            deliveryOption={deliveryOption}
          />
        )}

        <View style={styles.optionsContainer}>
          <Text style={styles.optionTile}>{IMLocalized('Payment')}</Text>
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.navigate('Cards', { appConfig, appStyles })
            }>
            <Text style={styles.options}>{selectedPaymentMethod.title}</Text>
          </TouchableWithoutFeedback>
        </View>
        {deliveryOption === 'pickUp' ? (
          <View style={[styles.optionsContainer, { borderBottomWidth: 0.5 }]}>
            <Text style={styles.optionTile}>
              {IMLocalized('Pick-Up from:')}
            </Text>
            <Text
              style={[
                styles.options,
                { fontSize: 14, fontWeight: 'bold', marginTop: 1 },
              ]}>
              {cartVendor.address}
            </Text>
          </View>
        ) : (
          <View style={[styles.optionsContainer, { borderBottomWidth: 0.5 }]}>
            <Text style={styles.optionTile}>{IMLocalized('Deliver to:')}</Text>
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate('AddAddress', {
                  appConfig,
                  appStyles,
                })
              }>
              <Text
                onPress={() => setVisible(true)}
                style={[styles.options, { fontWeight: 'bold' }]}>
                {shippingAddress.length === 0
                  ? IMLocalized('Select Address')
                  : `${shippingAddress.line1}`}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        )}

        {cartItems.map((item) => renderCartItems(item))}

        <View style={styles.optionsContainer}>
          <Text style={[styles.optionTile, { fontSize: 13 }]}>
            {IMLocalized('Subtotal')}
          </Text>
          <Text style={[styles.options, { fontSize: 13 }]}>
            {price?.toFixed(2)} Kr
          </Text>
        </View>
        <View
          style={[
            styles.optionsContainer,
            { borderTopWidth: 0, marginTop: -20 },
          ]}>
          <Text style={[styles.optionTile, { fontSize: 13 }]}>
            {IMLocalized('Service fee')}
          </Text>
          <Text style={[styles.options, { fontSize: 14 }]}>
            {serviceCharge?.toFixed(2)} Kr
          </Text>
        </View>

        {deliveryOption === 'pickUp' && (
          <View
            style={[
              styles.optionsContainer,
              { borderTopWidth: 0, marginTop: -20 },
            ]}>
            <Text style={[styles.optionTile, { fontSize: 13 }]}>
              {IMLocalized('Delivery fee')}
            </Text>
            <Text style={[styles.options, { fontSize: 13 }]}>
              {IMLocalized('Free')}
            </Text>
          </View>
        )}
        {deliveryOption === 'delivery' && (
          <View
            style={[
              styles.optionsContainer,
              { borderTopWidth: 0, marginTop: -20 },
            ]}>
            <Text style={[styles.optionTile, { fontSize: 13 }]}>
              {IMLocalized('Delivery fee')}
            </Text>
            <Text style={[styles.options, { fontSize: 13 }]}>
              {deliveryPrice?.toFixed(2)} Kr
            </Text>
          </View>
        )}

        <View style={[styles.optionsContainer, { borderTopWidth: 0 }]}>
          <Text
            style={[styles.optionTile, { fontWeight: 'bold', fontSize: 17 }]}>
            {IMLocalized('Total')}
          </Text>
          <TouchableWithoutFeedback>
            <Text
              style={[styles.optionTile, { fontWeight: 'bold', fontSize: 17 }]}>
              {(price + deliveryPrice + serviceCharge)?.toFixed(2)} Kr
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.deliveryOptions}>
          <View style={styles.deliveryOptionsContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onDeliveryAction}
              style={[
                deliveryOption === 'delivery'
                  ? styles.deliveryOptionsBtnActive
                  : styles.deliveryOptionsBtn,
              ]}>
              <Text style={styles.deliveryOptionsText}>
                {IMLocalized('Delivery')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onPickUpAction}
              style={
                deliveryOption === 'pickUp'
                  ? styles.deliveryOptionsBtnActive
                  : styles.deliveryOptionsBtn
              }>
              <Text style={styles.deliveryOptionsText}>
                {IMLocalized('Pick-Up')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button
        containerStyle={styles.actionButtonContainer}
        style={styles.actionButtonText}
        onPress={() => placeOrder3DS()}>
        {IMLocalized('Pay now')}
      </Button>
    </>
  );
}

export default IMCheckoutScreen;
