import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import { connect } from 'react-redux';
import { AppIcon } from '../AppStyles';
import authManager from '../Core/onboarding/utils/authManager';
import DynamicAppStyles from '../DynamicAppStyles';
import VendorAppConfig from '../VendorAppConfig';
import { IMUserProfileComponent } from '../Core/profile';
import { logout, setUserData } from '../Core/onboarding/redux/auth';
import { IMLocalized } from '../Core/localization/IMLocalization';
import Hamburger from './Hamburger/Hamburger';
import { Appearance } from 'react-native-appearance';

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const colorScheme = Appearance.getColorScheme();
    let currentTheme = DynamicAppStyles.navThemeConstants[colorScheme];
    navigation.setOptions({
      title: IMLocalized('Settings'),
      headerTintColor: currentTheme.activeTintColor,
      headerTitleStyle: { color: currentTheme.fontColor },
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });

    this.didFocusSubscription = props.navigation.addListener(
      'focus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'blur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription();
    this.willBlurSubscription && this.willBlurSubscription();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();

    return true;
  };

  onLogout() {
    authManager.logout(this.props.user);
    this.props.logout();
    this.props.navigation.navigate('LoadScreen', {
      appStyles: DynamicAppStyles,
      appConfig: VendorAppConfig,
    });
  }

  onUpdateUser = (newUser) => {
    this.props.setUserData({ user: newUser });
  };

  render() {
    const appStyles = this.props.route.params.appStyles;
    const appConfig = this.props.route.params.appConfig;
    var menuItems = [
      {
        title: IMLocalized('Account information'),
        icon: AppIcon.images.accountDetail,
        tintColor: '#000',
        onPress: () =>
          this.props.navigation.navigate('AccountDetail', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.editProfileFields,
            screenTitle: IMLocalized('Account information'),
          }),
      },
      {
        title: IMLocalized('Payment methods'),
        icon: AppIcon.images.payment,
        tintColor: '#000',
        onPress: () =>
          this.props.navigation.navigate('EditCards', {
            appConfig,
            appStyles,
            screenTitle: IMLocalized('Payment methods'),
          }),
      },
      /* {
        title: IMLocalized('Favoriter'),
        icon: AppIcon.images.favoriteRestaurant,
        tintColor: '#000',
        onPress: () => {
          console.log('Favourite Restaurants');
        },
      }, */
      /* {
        title: IMLocalized('Beställningshistorik'),
        icon: AppIcon.images.invoice,
        tintColor: '#000',
        onPress: () => this.props.navigation.navigate('OrderList'),
      }, */
      {
        title: IMLocalized('Notifications'),
        icon: AppIcon.images.settings,
        tintColor: '#000',
        onPress: () =>
          this.props.navigation.navigate('Settings', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.userSettingsFields,
            screenTitle: IMLocalized('Notifications'),
          }),
      },
      /* {
        title: IMLocalized('Contact'),
        icon: AppIcon.images.contactUs,
        tintColor: '#000',
        onPress: () =>
          this.props.navigation.navigate('Contact', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.contactUsFields,
            screenTitle: IMLocalized('Contact us'),
          }),
      }, */
    ];

    /*    if (this.props.isAdmin) {
      menuItems.push({
        title: IMLocalized('Admin Dashboard'),
        tintColor: '#000',
        icon: AppIcon.images.checklist,
        onPress: () => this.props.navigation.navigate('AdminDashboard'),
      });
    } */

    return (
      <IMUserProfileComponent
        user={this.props.user}
        onUpdateUser={(user) => this.onUpdateUser(user)}
        onLogout={() => this.onLogout()}
        menuItems={menuItems}
        appStyles={DynamicAppStyles}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    isAdmin: auth.user && auth.user.isAdmin,
  };
};

export default connect(mapStateToProps, {
  logout,
  setUserData,
})(MyProfileScreen);
