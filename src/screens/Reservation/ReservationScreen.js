import React from 'react';
import {
  Image,
  ScrollView,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import VendorAppConfig from './../../VendorAppConfig';

const regexForPhoneNumber = /\d{9}$/;

class ReservationScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation, route } = props;
    const appConfig = route.params.appConfig;
    if (!appConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        title: IMLocalized('Reservation')
      });
    }

    navigation.setOptions({
      title: IMLocalized('Reservation')
    });
    this.COLOR_SCHEME = Appearance.getColorScheme();
    const vendor = route.params?.vendor ?? {};
    if (!VendorAppConfig.isMultiVendorEnabled) {
      this.restaurantRef = firebase
        .firestore()
        .collection(appConfig.tables.VENDORS)
        .limit(1);
      this.unsubscribeRestaurants = null;
    }
    this.reservationRef = firebase
      .firestore()
      .collection(appConfig.tables.RESERVATIONS);

    this.unsubscribeReservations = null;

    this.state = {
      vendor: vendor,
      reservations: {},
      vendorList: [],
      firstname: this.props.user.firstName,
      lastname: this.props.user.lastName,
      phone: this.props.user.phone,
      detail: '',
    };
  }

  componentDidMount() {
    if (!VendorAppConfig.isMultiVendorEnabled) {
      this.unsubscribeRestaurants = this.restaurantRef.onSnapshot(
        this.onVendorsCollectionUpdate,
      );
    }
    this.unsubscribeReservations = this.reservationRef
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', this.props.user.id)
      .onSnapshot(this.onReservationUpdate, (error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    if (!VendorAppConfig.isMultiVendorEnabled) {
      this.unsubscribeRestaurants();
    }
    this.unsubscribeReservations();
  }

  onReservationUpdate = (querySnapshot) => {
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    this.setState({ reservations });
  };

  onVendorsCollectionUpdate = (querySnapshot) => {
    const vendors = [];
    querySnapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (vendors?.length > 0) {
      this.setState({
        vendor: vendors[0],
      });
    }
  };

  renderItem = ({ item }) => (
    <Image style={styles.detail} source={{ uri: item }} />
  );

  onReserve = () => {
    const { firstname, lastname, phone, detail } = this.state;
    const regexResult = regexForPhoneNumber.test(phone);
    const { navigation, route } = this.props;
    const appConfig = route.params.appConfig;
    const user = this.props.user;

    if (firstname && lastname && phone && detail && regexResult) {
      this.reservationRef
        .add({
          authorID: this.props.user.id,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          phone: this.state.phone,
          detail: this.state.detail,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          vendorID: this.state.vendor.id,
        })
        .then((_response) => {
          this.setState({
            firstname: user.firstName,
            lastname: user.lastName,
            phone: user.phone,
            detail: '',
          });
          Alert.alert(
            '',
            IMLocalized('Your reservation was successful.'),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
          navigation.navigate('ReservationHistoryScreen', { appConfig });
        })
        .catch(function (error) {
          alert(error);
        });
    } else if (!regexResult && firstname && lastname && phone && detail) {
      Alert.alert(
        '',
        IMLocalized(
          'Your phone number is invalid. Please use a valid phone number.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
    } else {
      Alert.alert(
        '',
        IMLocalized('Please fill out all the required fields.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
    }
  };

  onViewPastReservation = () => {
    const { navigation, route } = this.props;
    const appConfig = route.params.appConfig;
    navigation.navigate('ReservationHistoryScreen', {
      appConfig,
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <FastImage
            placeholderColor={
              DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
            }
            style={styles.photo}
            source={{ uri: this.state.vendor.photo }}
          />
          <View style={styles.overlay} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}> {this.state.vendor.title} </Text>
          <Text style={styles.description}> {this.state.vendor.address} </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              onChangeText={(text) => this.setState({ firstname: text })}
              value={this.state.firstname}
              placeholderTextColor={
                DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
              }
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({ lastname: text })}
              value={this.state.lastname}
              placeholderTextColor={
                DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
              }
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              onChangeText={(text) => this.setState({ phone: text })}
              value={this.state.phone}
              placeholderTextColor={
                DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
              }
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Reservation Details"
              onChangeText={(text) => this.setState({ detail: text })}
              value={this.state.detail}
              placeholderTextColor={
                DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
              }
              underlineColorAndroid="transparent"
            />
          </View>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.onReserve()}>
            {IMLocalized('Make Reservation')}
          </Button>
          <Button
            containerStyle={[
              styles.secondaryButtonContainer,
              { display: !this.state.reservations.length ? 'none' : 'flex' },
            ]}
            style={styles.secondaryButtonText}
            onPress={this.onViewPastReservation}>
            {IMLocalized('View Past Reservations')}
          </Button>
          <View
            style={[styles.buttonContainer, { backgroundColor: 'transparent' }]}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

ReservationScreen.propTypes = {
  user: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default connect(mapStateToProps)(ReservationScreen);
