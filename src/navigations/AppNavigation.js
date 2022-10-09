import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShoppingCartButton from '../components/ShoppingCartButton/ShoppingCartButton';
import CartScreen from '../Core/cart/ui/Cart/IMCartScreen';
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen';

import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu';

import SingleItemDetail from '../screens/SingleItemDetail/SingleItemDetailScreen';
import SingleVendorScreen from '../screens/SingleVendor/SingleVendorScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderListScreen from '../screens/OrderList/OrderListScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen';
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen';
import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen';
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen';
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen';
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import ResetPasswordScreen from '../Core/onboarding/ResetPasswordScreen/ResetPasswordScreen';
import DynamicAppStyles from '../DynamicAppStyles';
import AppConfig from '../VendorAppConfig';
import IMVendorsMap from '../Core/vendor/ui/IMVendorsMap/IMVendorsMap';
import AdminOrderListScreen from '../Core/vendor/admin/ui/AdminOrderList/AdminOrderListScreen';
import AdminVendorListScreen from '../Core/vendor/admin/ui/AdminVendorList/AdminVendorListScreen';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CheckoutScreen from '../Core/cart/ui/IMCheckoutScreen';
import CardScreen from '../Core/payment/ui/Card/IMCardScreen';
import EditCards from '../Core/profile/ui/components/EditCardView/EditCardView';
import MyProfileScreen from '../components/MyProfileScreen';
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile';
import IMVendorReview from '../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen';
import stripe from 'tipsi-stripe';
import FastImage from 'react-native-fast-image';
import IMOrderTrackingScreen from '../Core/delivery/IMOrderTrackingScreen/IMOrderTrackingScreen';
import IMAddAddressModal from '../Core/payment/component/IMAddAddressModal/IMAddAddressModal';
import EditAddressView from '../Core/profile/ui/components/EditAddressView/EditAddressView';
import { IMChatScreen } from '../Core/chat';

import ReservationScreen from '../screens/Reservation/ReservationScreen';
import ReservationHistoryScreen from '../screens/ReservationHistory/ReservationHistoryScreen';

import VendorHomeScreen from '../vendorapp/screens/Home/HomeScreen';
import VendorProductsScreen from '../vendorapp/screens/ProductList/ProductListScreen';

import DriverHomeScreen from '../driverapp/screens/Home/HomeScreen';
import DriverOrdersScreen from '../driverapp/screens/Orders/OrdersScreen';
import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { IMCategoryVendorsScreen } from '../Core/vendor/ui/IMVendors/IMCategoryVendors/IMCategoryVendorsScreen';
import { IMLocalized } from '../Core/localization/IMLocalization';
import { useSelector } from 'react-redux';
import authManager from '../Core/onboarding/utils/authManager';
import DriverAppConfig from '../driverapp/DriverAppConfig';
import BecomeFoodArtist from '../screens/BecomeFoodArtist/BecomeFoodArtist';

stripe.setOptions({
  publishableKey: AppConfig.STRIPE_CONFIG.PUBLISHABLE_KEY,
  merchantId: AppConfig.STRIPE_CONFIG.MERCHANT_ID,
  androidPayMode: AppConfig.STRIPE_CONFIG.ANDROID_PAYMENT_MODE,
});

const Main = createStackNavigator();
const MainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <Main.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: 'FallingSkyCond',
        },
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
        /* Visar ikoner på höger sida av home sidan dvs map och cart */
        headerRight: () => (
          <View style={styles.headerRight}>
            {AppConfig.isMultiVendorEnabled && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <FastImage
                  source={require('../../assets/icons/mumsy-location.png')}
                  style={styles.mapImage}
                />
              </TouchableOpacity>
            )}
            <ShoppingCartButton
              onPress={() => {
                navigation.navigate('Cart', {
                  appStyles: DynamicAppStyles,
                  appConfig: AppConfig,
                });
              }}
            />
          </View>
        ),
      })}
      initialRouteName="Home"
      headerMode="float">
      {/* Alla komponenter och de visas beroende på vilken roll du har i databasen*/}
      <Main.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Main.Screen name="Cart" component={CartScreen} />
      <Main.Screen name="OrderList" component={OrderListScreen} />
      <Main.Screen name="Search" component={SearchScreen} />
      <Main.Screen name="SingleVendor" component={SingleVendorScreen} />
      <Main.Screen name="SingleItemDetail" component={SingleItemDetail} />
      <Main.Screen name="CategoryList" component={CategoryListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />
      <Main.Screen name="Restaurants" component={AdminVendorListScreen} />
      <Main.Screen name="AdminOrder" component={AdminOrderListScreen} />
      <Main.Screen name="Checkout" component={CheckoutScreen} />
      <Main.Screen name="Cards" component={CardScreen} />
      <Main.Screen name="EditCards" component={EditCards} />
      <Main.Screen name="Reviews" component={IMVendorReview} />
      <Main.Screen name="MyProfile" component={MyProfileScreen} />
      <Main.Screen name="BecomeFoodArtist" component={BecomeFoodArtist} />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={IMLocalized('Contact')}
        component={IMContactUsScreen}
      />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name="Settings"
        component={IMUserSettingsScreen}
      />
      <Main.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <Main.Screen name="Vendor" component={IMCategoryVendorsScreen} />
      <Main.Screen
        name="OrderTrackingScreen"
        component={IMOrderTrackingScreen}
      />
      <Main.Screen name="AddAddress" component={IMAddAddressModal} />
      <Main.Screen name="EditAddress" component={EditAddressView} />
      <Main.Screen name="PersonalChat" component={IMChatScreen} />
      <Main.Screen name="ReservationScreen" component={ReservationScreen} />
      <Main.Screen
        name="ReservationHistoryScreen"
        component={ReservationHistoryScreen}
      />
    </Main.Navigator>
  );
};
const Drawer = createDrawerNavigator();
/* Här skapas drawer menu som är en dependecy från react navigation */
const DrawerStack = (props) => {
  const user = props;
  const drawer = user.isAdmin ? (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={AppConfig.drawerMenuConfig.adminDrawerConfig.upperMenu}
      menuItemsSettings={AppConfig.drawerMenuConfig.adminDrawerConfig.lowerMenu}
      appStyles={DynamicAppStyles}
      authManager={authManager}
      appConfig={AppConfig}
    />
  ) : AppConfig.isMultiVendorEnabled ? (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={AppConfig.drawerMenuConfig.vendorDrawerConfig.upperMenu}
      menuItemsSettings={
        AppConfig.drawerMenuConfig.vendorDrawerConfig.lowerMenu
      }
      appStyles={DynamicAppStyles}
      authManager={authManager}
      appConfig={AppConfig}
    />
  ) : (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={AppConfig.drawerMenuConfig.customerDrawerConfigupperMenu}
      menuItemsSettings={
        AppConfig.drawerMenuConfig.customerDrawerConfig.lowerMenu
      }
      appStyles={DynamicAppStyles}
      authManager={authManager}
      appConfig={AppConfig}
    />
  );
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => drawer}>
      <Drawer.Screen name="Main" component={MainNavigation} />
    </Drawer.Navigator>
  );
};

const Login = createStackNavigator();
const LoginStack = () => {
  // Här hämtas login & signup komponenterna
  //finns även med sms auth och reset password kopplat med firebase
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
          authManager: authManager,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Login.Navigator>
  );
};

// food artist navigation
const VendorMain = createStackNavigator();
const VendorMainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <VendorMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTitleAlign: 'center',
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      })}
      initialRouteName="Home"
      headerMode="float">
      <VendorMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={VendorHomeScreen}
      />
      <VendorMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Products"
        component={VendorProductsScreen}
      />
    </VendorMain.Navigator>
  );
};

// food artist drawer navigation
const VendorDrawer = createDrawerNavigator();
const VendorDrawerStack = () => {
  return (
    <VendorDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerStyle={{ width: 250 }}
      drawerPosition="left"
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={AppConfig.drawerMenuConfig.vendorDrawer.upperMenu}
          menuItemsSettings={AppConfig.drawerMenuConfig.vendorDrawer.lowerMenu}
          appStyles={DynamicAppStyles}
          authManager={authManager}
          appConfig={AppConfig}
        />
      )}>
      <VendorDrawer.Screen name="Main" component={VendorMainNavigation} />
    </VendorDrawer.Navigator>
  );
};

// food delivery navigation
const DriverMain = createStackNavigator();
const DriverMainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <DriverMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTitleAlign: 'center',
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      })}
      initialRouteName="Home"
      headerMode="float">
      <DriverMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={DriverHomeScreen}
      />
      <DriverMain.Screen name="MyProfile" component={MyProfileScreen} />
      <DriverMain.Screen name="OrderList" component={DriverOrdersScreen} />
      <DriverMain.Screen name="Contact" component={IMContactUsScreen} />
      <DriverMain.Screen name="Settings" component={IMUserSettingsScreen} />
      <DriverMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <DriverMain.Screen name="PersonalChat" component={IMChatScreen} />
    </DriverMain.Navigator>
  );
};

// food delivery drawer
const DriverDrawer = createDrawerNavigator();
const DriverDrawerStack = () => {
  return (
    <DriverDrawer.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={AppConfig.drawerMenuConfig.driverDrawerConfig.upperMenu}
          menuItemsSettings={
            AppConfig.drawerMenuConfig.driverDrawerConfig.lowerMenu
          }
          appStyles={DynamicAppStyles}
          authManager={authManager}
          appConfig={DriverAppConfig}
        />
      )}
      drawerPosition="left"
      drawerStyle={{ width: 250 }}>
      <DriverDrawer.Screen name="Main" component={DriverMainNavigation} />
    </DriverDrawer.Navigator>
  );
};

/* Navigation logiken börjar här */
const RootStack = createStackNavigator();
const RootNavigator = () => {
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser.role);
  /* När en användare precis laddar ner appen visas följande */
  /* annars visas enbart LoginStack*/
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
          authManager: authManager,
        }}
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      {/* Som nämnts tidigare så visas komponenter baserat på roll som har satts i databasen */}
      {currentUser?.role === 'vendor' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={VendorDrawerStack}
        />
      ) : currentUser?.role === 'driver' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DriverDrawerStack}
        />
      ) : currentUser?.role === 'regularuser' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      )}
      <RootStack.Screen
        options={{ headerShown: false }}
        name="VendorStack"
        component={VendorDrawerStack}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="DriverStack"
        component={DriverDrawerStack}
      />
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  /* Här exponeras logiken */
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

/* Detta gör det möjligt att hämta funktionerna och använda i andra ställen */
export { RootNavigator, AppNavigator };

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 26, height: 27 },
});
