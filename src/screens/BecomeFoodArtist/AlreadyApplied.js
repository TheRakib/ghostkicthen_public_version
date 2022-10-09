import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
/* import { Form, Item, Input, Body, Button } from 'native-base'; */
import { IMLocalized } from '../../Core/localization/IMLocalization';

const AlreadyApplied = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle}>
        <View style={[styles.formArea, { top: '20%' }]}>
          <Text style={[styles.textContainer, styles.signin, { fontSize: 25 }]}>
            {IMLocalized('Thank you for your application!')}
          </Text>
          <Text
            style={[
              styles.textContainer,
              { color: '#000', marginBottom: 0, marginTop: -30 },
            ]}>
            {IMLocalized('We will get back to you within 48 hours.')}
          </Text>
          <Text
            style={[
              styles.textContainer,
              { color: '#000', fontSize: 17, marginTop: 5, marginBottom: 80 },
            ]}>
            {IMLocalized('Thank you for your patience!')}
          </Text>
          <Image
            style={{
              alignSelf: 'center',
              width: 80,
              height: 80,
              marginBottom: 25,
            }}
            source={require('../../CoreAssets/tick.png')}
            tintColor={'#21B600'}
          />
        </View>
      </View>
      <View style={styles.bottom} />
    </View>
  );
};

export default AlreadyApplied;
