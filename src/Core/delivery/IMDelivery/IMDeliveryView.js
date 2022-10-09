import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
//import {Circle} from 'react-native-progress';
import dynamicStyles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IMLocalized } from '../../localization/IMLocalization';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

export default function IMDeliveryView({
  navigation,
  order,
  appStyles,
  style,
}) {
  const currentUser = useSelector((state) => state.auth.user);

  const styles = dynamicStyles(appStyles);

  const [pickUpAddress, setPickUpAddress] = useState(order.vendor.address);
  const [vendorPhone, setVendorPhone] = useState(order.vendor.phone);

  const renderOrderSummary = (product) => {
    return (
      <View style={styles.orderPane}>
        <Text style={styles.qty}>{product.quantity}</Text>
        <Text style={styles.productItem}>{product.name}</Text>
      </View>
    );
  };

  const onCallButtonPress = () => {
    const phoneNumber = order.driver && order.driver.phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const onSendMessageButtonPress = () => {
    const driverID = order.driver && order.driver.id;
    const viewerID = currentUser.id || currentUser.userID;
    let channel = {
      id: viewerID < driverID ? viewerID + driverID : driverID + viewerID,
      participants: [order.driver],
    };
    navigation.navigate('PersonalChat', {
      channel,
      appStyles,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Delivery Screen'),
      headerRight: () => (
        <Icon name="options-vertical" type="simple-line-icon" />
      ),
      headerStyle: {
        backgroundColor: '#f5e9e9',
      },
    });
  }, [navigation]);

  const renderDriver = (driver) => {
    return (
      <View>
        <View style={styles.medalContainer}>
          <View styles={styles.driverContainer}>
            <Text style={styles.driverTitle}>
              {driver.firstName} {IMLocalized('is in a')} {driver.carName}
            </Text>
            <Text style={styles.plateNum}>{driver.carNumber}</Text>
          </View>
          <View style={styles.imagesContainer}>
            {driver.profilePictureURL && (
              <FastImage
                style={styles.driverImage}
                source={{ uri: driver.profilePictureURL }}
              />
            )}
            {driver.carPictureURL && (
              <FastImage
                style={styles.carImage}
                source={{ uri: driver.carPictureURL }}
              />
            )}
          </View>
        </View>

        <View style={styles.contactPane}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={onCallButtonPress}>
            <Icon name="call" onPress={onCallButtonPress} />
          </TouchableOpacity>
          <Text style={styles.messageButton} onPress={onSendMessageButtonPress}>
            {IMLocalized('Send a message')}
          </Text>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <>
      {order.chosenDelivery === 'pickUp' ? (
        <View style={[styles.container, styles.overlay]}>
          <Text style={styles.sectionTitle}>
            {IMLocalized('Delivery Details')}
          </Text>
          <Text style={styles.subMainTitle}>{IMLocalized('Address')}</Text>
          <Text style={styles.subText}>{pickUpAddress}</Text>
          <Text style={[styles.subMainTitle, { marginTop: '3%' }]}>
            {IMLocalized('Phone')}
          </Text>
          <Text style={styles.subText}>{vendorPhone}</Text>
          <View style={styles.line} />
          <Text style={styles.subMainTitle}>{IMLocalized('Type')}</Text>
          <Text style={styles.subText}>{IMLocalized('Pick up')}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>
            {IMLocalized('Order Summary')}
          </Text>
          <View style={styles.horizontalPane}>
            <Text style={styles.vendorTitle}>
              {order.vendor && order.vendor.title}
            </Text>
            <Text style={styles.receipts}>{IMLocalized('View Receipts')}</Text>
          </View>
          {order.products.map((product) => renderOrderSummary(product))}
          <View style={styles.horizontalPane}>
            <Text style={styles.totalText}>{IMLocalized('Total')}</Text>
            <Text style={styles.totalPrice}>
              {order.products
                .reduce((prev, next) => prev + next.price * next.quantity, 0)
                .toFixed(2)}{' '}
              Kr
            </Text>
          </View>
          <View style={styles.divider} />
        </View>
      ) : (
        <View style={[styles.container, styles.overlay]}>
          {order.driver !== undefined &&
            order.status !== 'Order Completed' &&
            renderDriver(order.driver)}
          <Text style={styles.sectionTitle}>
            {IMLocalized('Delivery Details')}
          </Text>
          <Text style={styles.subMainTitle}>{IMLocalized('Address')}</Text>
          <Text style={styles.subText}>
            {order.address.line1}
            {', '}
            {order.address.postalCode} {order.address.city}
          </Text>
          <View style={styles.line} />
          <Text style={styles.subMainTitle}>
            {IMLocalized('Delivery Type')}
          </Text>
          <Text style={styles.subText}>{IMLocalized('Deliver to door')}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>
            {IMLocalized('Order Summary')}
          </Text>
          <View style={styles.horizontalPane}>
            <Text style={styles.vendorTitle}>
              {order.vendor && order.vendor.title}
            </Text>
            <Text style={styles.receipts}>{IMLocalized('View Receipts')}</Text>
          </View>
          {order.products.map((product) => renderOrderSummary(product))}
          {/* <View style={styles.showMoreContainer}>
        <Text style={styles.showMoreText}>Show more </Text>
        <Icon type="ionicon" size={15} name="ios-arrow-down" />
      </View> */}

          <View style={styles.horizontalPane}>
            <Text style={styles.totalText}>{IMLocalized('Total')}</Text>
            <Text style={styles.totalPrice}>
              {order.products
                .reduce((prev, next) => prev + next.price * next.quantity, 0)
                .toFixed(2)}{' '}
              Kr
            </Text>
          </View>
          {/* <View style={styles.divider} />
      <View style={styles.medalContainer}>
        <View style={styles.medalTextContainer}>
          <Image
            style={styles.medalImage}
            source={require('../../../CoreAssets/gold.png')}
          />
          <Text>Gold</Text>
        </View>
        <View style={styles.medalTextContainer}>
          <Text style={styles.nextReward}>
            {IMLocalized('Your next reward')}
          </Text>
          <Circle
            progress={0.5}
            thickness={6}
            color="#D4AF37"
            unfilledColor="#FFDF00"
            size={24}
            width={25}
            borderWidth={0}
          />
        </View>
      </View> */}
          <View style={styles.divider} />
        </View>
      )}
    </>
  );
}
