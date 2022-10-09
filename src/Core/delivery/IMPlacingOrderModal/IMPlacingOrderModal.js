import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Tick from '../../../CoreAssets/tick.png';
import * as Progress from 'react-native-progress';
import dynamicStyles from './styles';
import { IMLocalized } from '../../localization/IMLocalization';
import { useSelector } from 'react-redux';

export function IMPlacingOrderModal(props) {
  const {
    isVisible,
    onCancel,
    cartItems,
    user,
    shippingAddress,
    appStyles,
    deliveryOption,
  } = props;
  const styles = dynamicStyles(appStyles);
  const cartVendor = useSelector((state) => state.cart.vendor);

  function undo() {
    onCancel();
  }

  function renderCartItems(item) {
    return (
      <View style={styles.orderPane}>
        <Text style={[styles.productItem, styles.number]}>{item.quantity}</Text>
        <Text style={[styles.productItem]}>{item.name}</Text>
      </View>
    );
  }

  return (
    <Modal
      onModalShow={() => {}}
      onModalHide={() => clearTimeout(countDown())}
      isVisible={isVisible}
      style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>{IMLocalized('Placing Order...')}</Text>
        <View style={styles.progress}>
          <Progress.Circle
            animated
            color="#00B705"
            indeterminate
            indeterminateAnimationDuration={6000}
            size={24}
            borderWidth={3}
          />
        </View>
        <View style={styles.addressPane}>
          {deliveryOption === 'pickUp' ? (
            <Image
              style={[styles.tick, { marginBottom: 45 }]}
              tintColor={'#00B705'}
              source={Tick}
            />
          ) : (
            <Image
              style={[styles.tick, { marginBottom: 65 }]}
              tintColor={'#00B705'}
              source={Tick}
            />
          )}

          {deliveryOption === 'pickUp' ? (
            <View>
              <Text style={styles.text}>
                {IMLocalized('Pick up your order from')}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>
                {cartVendor.address}
              </Text>

              <Text style={styles.description}>
                {IMLocalized('Pick up from Food Artist')}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={
                  styles.text
                }>{`${shippingAddress.line1} ${shippingAddress.line2} \n ${shippingAddress.postalCode} \n ${shippingAddress.city}`}</Text>

              <Text style={styles.description}>
                {IMLocalized('Deliver to door')}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.addressPane}>
          <Image style={styles.tick} tintColor={'#00B705'} source={Tick} />
          <View>
            <Text style={styles.text}>
              {IMLocalized('Your order')}, {user.firstName}
            </Text>
          </View>
        </View>
        {cartItems.map((item) => renderCartItems(item))}
        <Text style={styles.undo} onPress={() => undo()}>
          {IMLocalized('Undo')}
        </Text>
      </View>
    </Modal>
  );
}

IMPlacingOrderModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  cartItems: PropTypes.array,
  user: PropTypes.object,
};
