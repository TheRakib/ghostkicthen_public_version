import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, Text, View, Image, Alert } from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Appearance } from 'react-native-appearance';
import DynamicAppStyles from '../../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../../components/Hamburger/Hamburger';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { VendorOrderAPIManager } from '../../api/orders';
import { TNEmptyStateView } from '../../../Core/truly-native/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../../Core/firebase/config';

function HomeScreen(props) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const currentUser = useSelector((state) => state.auth.user);
  const apiManager = new VendorOrderAPIManager(setOrders);
  const COLOR_SCHEME = Appearance.getColorScheme();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: IMLocalized('Manage Orders'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      ),
    });
  });

  if (status === 'Open') {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ padding: 8 }} onPress={offlineAlert}>
          <Image
            source={require('../../../../assets/icons/mumsy-offbtn.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: '#FF0000',
            }}
          />
        </TouchableOpacity>
      ),
    });
  } else {
    props.navigation.setOptions({
      headerRight: null,
    });
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.id)
      .onSnapshot((doc) => {
        setStatus(doc.data().restaurantStatus);
      });
  }, []);

  useEffect(() => {
    apiManager.unsubscribe();
    apiManager.subscribe(currentUser);
  }, [currentUser]);

  const offlineAlert = () => {
    Alert.alert(
      'Vänta lite!',
      'Är du säker på att du vill stänga restaurangen för dagen?',
      [
        {
          text: 'Avbryt',
          style: 'cancel',
        },
        { text: 'Ja', onPress: goOffline },
      ],
      { cancelable: false },
    );
  };

  const goOffline = async () => {
    const response = await firebase
      .firestore()
      .collection('vendors')
      .doc(currentUser.vendorID)
      .update({ restaurantStatus: 'Closed' });

    await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.id)
      .update({ restaurantStatus: 'Closed' });

    console.log(currentUser.restaurantStatus);
    return response;
  };

  const onGoOnline = async () => {
    const response = await firebase
      .firestore()
      .collection('vendors')
      .doc(currentUser.vendorID)
      .update({ restaurantStatus: 'Open' });

    console.log(currentUser.restaurantStatus);
    await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.id)
      .update({ restaurantStatus: 'Open' });

    return response;
  };

  //This button renders when mumsy delivery has been choosen as delivery option
  const onAccept = (order) => {
    apiManager.accept(order);
  };

  //This button renders when customer has choosen  Pick-Up
  const onPickUpAccept = (order) => {
    apiManager.pickUpAccept(order);
  };

  //This button renders when mumsy selfdelievry has been choosen as delivery option
  const onSelfDeliveryAccept = (order) => {
    apiManager.selfDeliveryAccept(order);
  };

  //Rejecting the order
  const onReject = (order) => {
    apiManager.reject(order);
  };

  // Pick Up status
  const onFoodReady = (order) => {
    apiManager.foodReady(order);
  };

  const onFoodPicked = (order) => {
    apiManager.PickedUpOrder(order);
  };

  const onCompleteDelivery = (order) => {
    apiManager.completeDelivery(order);
  };

  //Self delivery status
  const onReadyToDeliver = (order) => {
    apiManager.readyToDeliver(order);
  };

  const emptyStateConfig = {
    title: IMLocalized("You're offline"),
    description: IMLocalized('Open your restaurant for the day!'),
    buttonName: IMLocalized('Go Online'),
    onPress: onGoOnline,
  };

  const renderItem = ({ item }) => {
    const address = item.address;
    const addressText = IMLocalized('Deliver to: ');
    const PickUpInfoText = IMLocalized('Pick Up From: ');
    const PickUpPhone = IMLocalized('Phone: ');
    return (
      <View style={styles.container}>
        <View>
          {item != null &&
            item.products != null &&
            item.products[0] != null &&
            item.products[0].photo != null &&
            item.products[0].photo.length > 0 && (
              <FastImage
                placeholderColor={DynamicAppStyles.colorSet[COLOR_SCHEME].grey9}
                style={styles.photo}
                source={{ uri: item.products[0].photo }}
              />
            )}
          <View style={styles.overlay} />
          {item.chosenDelivery === 'pickUp' ? (
            <>
              <Text style={styles.address}>
                {`${PickUpInfoText}${address?.name} \n ${PickUpPhone}${address?.phone}`}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.address}>
                {`${addressText} ${address?.line1} ${address?.line2} ${address?.city} ${address?.postalCode}`}
              </Text>
            </>
          )}
        </View>
        {item.products.map((product) => {
          return (
            <View style={styles.rowContainer} key={product.id}>
              <Text style={styles.count}>{product.quantity}</Text>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>{product.price} Kr</Text>
            </View>
          );
        })}
        <View style={styles.actionContainer}>
          <Text style={styles.total}>
            {IMLocalized('Total: ')}
            {item.products
              .reduce((prev, next) => prev + next.price * next.quantity, 0)
              .toFixed(2)}{' '}
            Kr
          </Text>
          {item.status === 'Order Placed' ? (
            <View style={styles.buttonsContainer}>
              {item.chosenDelivery === 'pickUp' && (
                <Button
                  containerStyle={styles.actionButtonContainer}
                  style={styles.actionButtonText}
                  onPress={() => onPickUpAccept(item)}>
                  {IMLocalized('Accept')}
                </Button>
              )}

              {item.products[0].delivery === 'selfDelivery' &&
                item.chosenDelivery !== 'pickUp' && (
                  <Button
                    containerStyle={styles.actionButtonContainer}
                    style={styles.actionButtonText}
                    onPress={() => onSelfDeliveryAccept(item)}>
                    {IMLocalized('Accept')}
                  </Button>
                )}

              {item.products[0].delivery === 'mumsyDelivery' &&
                item.chosenDelivery !== 'pickUp' && (
                  <Button
                    containerStyle={styles.actionButtonContainer}
                    style={styles.actionButtonText}
                    onPress={() => onAccept(item)}>
                    {IMLocalized('Accept')}
                  </Button>
                )}

              <Button
                containerStyle={styles.rejectButtonContainer}
                style={styles.rejectButtonText}
                onPress={() => onReject(item)}>
                {IMLocalized('Reject')}
              </Button>
            </View>
          ) : item.chosenDelivery === 'pickUp' &&
            item.status === 'Order Pick Up Accepted' ? (
            <>
              <Button
                containerStyle={styles.actionButtonContainer}
                style={styles.actionButtonText}
                onPress={() => onFoodReady(item)}>
                {IMLocalized('Food is ready')}
              </Button>
            </>
          ) : item.chosenDelivery === 'pickUp' &&
            item.status === 'Order Is Ready' ? (
            <Button
              containerStyle={styles.actionButtonContainer}
              style={styles.actionButtonText}
              onPress={() => onFoodPicked(item)}>
              {IMLocalized('Food has been picked')}
            </Button>
          ) : item.products[0].delivery === 'selfDelivery' &&
            item.status === 'Order Self Delivery Accepted' ? (
            <>
              <Button
                containerStyle={styles.actionButtonContainer}
                style={styles.actionButtonText}
                onPress={() => onReadyToDeliver(item)}>
                {IMLocalized('Ready To deliver')}
              </Button>
            </>
          ) : item.products[0].delivery === 'selfDelivery' &&
            item.status === 'Self Delivery On Way' ? (
            <Button
              containerStyle={styles.actionButtonContainer}
              style={styles.actionButtonText}
              onPress={() => onCompleteDelivery(item)}>
              {IMLocalized('Complete Delivery')}
            </Button>
          ) : (
            <Text style={styles.statusText}>{item.status}</Text>
          )}
        </View>
      </View>
    );
  };

  if (status === 'Closed') {
    return (
      <View style={styles.inactiveViewContainer}>
        <TNEmptyStateView
          appStyles={DynamicAppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    );
  }

  if (status === 'Open') {
    return (
      <FlatList
        style={styles.screenContainer}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
      />
    );
  }
  return null;
}

HomeScreen.propTypes = {
  user: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default HomeScreen;
