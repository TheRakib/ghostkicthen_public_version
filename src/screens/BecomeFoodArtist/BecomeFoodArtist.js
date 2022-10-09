import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import styles from './styles';
import { Form, Item, Input, Body, Button } from 'native-base';
import { RadioButton } from 'react-native-paper';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { firebase } from '../../Core/firebase/config';
import AlreadyApplied from './AlreadyApplied';

const BecomeFoodArtist = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgNr, setOrgNr] = useState('');
  const [checkedRole, setChecked] = useState('');
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentReq, setSentReq] = useState(false);

  const validateEmail = (text) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(text).toLowerCase()) ? true : false;
  };

  const regexForPhoneNumber = (number) => {
    let reg = /\d{10}$/;
    return reg.test(String(number)) ? true : false;
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <View />,
      headerTitle: IMLocalized('Start your journey here'),
    });
  }, []);

  // Have to optimize!!!!
  async function applicationVendor() {
    await firebase
      .firestore()
      .collection('vendor')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().userID === user.userID) {
            setApplied(true);
          }
        });
      });
  }

  async function applicationDriver() {
    await firebase
      .firestore()
      .collection('drivers')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().userID === user.userID) {
            setApplied(true);
          }
        });
      });
  }

  useEffect(() => {
    applicationDriver();
    applicationVendor();
  }, []);

  const allFieldsCompleted = () => {
    if (username === '') {
      return false;
    } else if (address === '') {
      return false;
    } else if (email === '') {
      return false;
    } else if (phone === '') {
      return false;
    } else if (checkedRole === '') {
      return false;
    }

    return true;
  };

  async function handleOnSubmit() {
    if (!allFieldsCompleted()) {
      Alert.alert('', IMLocalized('Please fill out all the fields.'));
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert(
        '',
        IMLocalized('Please enter a valid Email address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!regexForPhoneNumber(phone)) {
      Alert.alert(
        '',
        IMLocalized('Please enter a valid Phone number.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }
    const userInfo = {
      username,
      address,
      email,
      phone,
      checkedRole,
      orgNr,
      userID: user.userID,
    };
    console.log(userInfo);
    setLoading(true);
    const res = await axios.post(
      'https://us-central1-mumsyfoodlover.cloudfunctions.net/createPartners',
      userInfo,
    );
    if (res) {
      setLoading(false);
      setSentReq(true);
    }
    console.log(
      res,
      ' msg ska skicka till kunder plus säg de att de ska vänta 48 ti. innan vi lägger de som kund',
    );
  }

  return (
    <>
      {applied || sentReq ? (
        <AlreadyApplied />
      ) : (
        <View style={styles.container}>
          <View style={styles.top} />
          <View style={styles.middle}>
            <View style={styles.formArea}>
              <Text style={[styles.textContainer, styles.signin]}>
                {IMLocalized(
                  'Start the journey with us and make money on your own terms',
                )}
              </Text>

              <Form styles={styles.mainForm}>
                <Item style={styles.formItems}>
                  <Input
                    style={styles.input}
                    placeholder={IMLocalized('Full Name')}
                    onChangeText={(val) => setUserName(val)}
                  />
                </Item>
                <Item style={styles.formItems}>
                  <Input
                    style={styles.input}
                    placeholder={IMLocalized('Address')}
                    onChangeText={(val) => setAddress(val)}
                  />
                </Item>
                <Item style={styles.formItems}>
                  <Input
                    keyboardType="email-address"
                    style={styles.input}
                    placeholder={IMLocalized('E-mail')}
                    onChangeText={(val) => setEmail(val)}
                    keyboardType="email-address"
                  />
                </Item>
                <Item style={styles.formItems}>
                  <Input
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder={IMLocalized('Phone number')}
                    onChangeText={(val) => setPhone(val)}
                  />
                </Item>
                <Item style={styles.formItems}>
                  <Input
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder={IMLocalized('Organization number')}
                    onChangeText={(val) => setOrgNr(val)}
                  />
                </Item>

                <View style={styles.workAsMainText}>
                  <Text style={styles.loginText}>
                    {IMLocalized('Choose your service:')}
                  </Text>
                </View>
                <View style={styles.workAs}>
                  <RadioButton
                    color="#06B600"
                    value="drivers"
                    status={checkedRole === 'drivers' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('drivers')}
                  />
                  <Body>
                    <Text style={[styles.CheckBoxText, { marginRight: 15 }]}>
                      {IMLocalized('Mumsy Delivery')}
                    </Text>
                  </Body>
                  <RadioButton
                    color="#06B600"
                    value="vendor"
                    status={checkedRole === 'vendor' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('vendor')}
                  />
                  <Body>
                    <Text style={styles.CheckBoxText}>
                      {IMLocalized('Mumsy Food Artist')}
                    </Text>
                  </Body>
                </View>
                <View style={styles.button}>
                  {loading ? (
                    <Button
                      disabled
                      block
                      style={[styles.mainBtn, { backgroundColor: '#9B9B9B' }]}>
                      <Text style={styles.btnText}>
                        <ActivityIndicator size={30} color="#fff" />
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      onPress={handleOnSubmit}
                      block
                      style={styles.mainBtn}>
                      <Text style={styles.btnText}>
                        {IMLocalized('Submit')}
                      </Text>
                    </Button>
                  )}
                  <View style={styles.termsCondition}>
                    <Text style={styles.termsTextBtn}>
                      {IMLocalized(
                        'Genom att registrera dig accepterar du vår Användarvillkor och Integritetspolicy.',
                      )}
                    </Text>
                  </View>
                </View>
              </Form>
            </View>
          </View>
          <View style={styles.bottom} />
        </View>
      )}
    </>
  );
};

export default BecomeFoodArtist;
