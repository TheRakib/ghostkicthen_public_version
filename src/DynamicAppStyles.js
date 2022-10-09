import { Platform, Dimensions, I18nManager } from 'react-native';
import invert from 'invert-color';
import { Appearance } from 'react-native-appearance';
import { AppleButton } from '@invertase/react-native-apple-authentication';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const COLOR_SCHEME = Appearance.getColorScheme();

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainTextColor: 'black',
  mainSubtextColor: '#7e7e7e',
  mainThemeForegroundColor: '#FFCB34',
  hairlineColor: '#ffffff',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  whiteSmoke: '#f5f5f5',
  grey: 'grey',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#111111',
  mainTextColor: '#000000',
  mainSubtextColor: invert('#7e7e7e'),
  mainThemeForegroundColor: '#FEC600',
  hairlineColor: invert('#e0e0e0'),
  grey0: invert('#eaeaea'),
  grey3: invert('#e6e6f2'),
  grey6: invert('#d6d6d6'),
  grey9: invert('#939393'),
  whiteSmoke: invert('#f5f5f5'),
  grey: 'grey',
};

const colorSet = {
  dark: lightColorSet /* darkColorSet, */,
  light: lightColorSet,
  'no-preference': lightColorSet,
  mainThemeBackgroundColor: '#ffffff',
  mainTextColor: '#555555',
  mainSubtextColor: '#7e7e7e',
  mainThemeForegroundColor: '#FEC600',
  hairlineColor: '#e0e0e0',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  whiteSmoke: '#ffffff',
  grey: 'grey',
};

const navLight = {
  backgroundColor: '#fff',
  fontColor: '#000',
  headerStyleColor: '#E8E8E8',
  iconBackground: '#F4F4F4',
  activeTintColor: '#5ea23a',
};

const navDark = {
  backgroundColor: invert('#fff'),
  fontColor: invert('#000'),
  headerStyleColor: invert('E8E8E8'),
  iconBackground: invert('#e6e6f2'),
  activeTintColor: '#5ea23a',
};

const navThemeConstants = {
  light: navLight,
  dark: navLight /* navDark, */,
  'no-preference': navLight,
};

const fontFamily = {
  /* Ny font */
  main: 'Raleway-Light',
  bold: 'Raleway-ExtraBold',
  /* Gammal font */
  /* main: 'FallingSky', */
  /* bold: 'FallingSkyBd', */
};

const iconSet = {
  logo: require('../assets/icons/restaurant-menu.png'),
  menuHamburger: require('./CoreAssets/mumsy-hamburger-menu.png'),
  playButton: require('./CoreAssets/play-button.png'),
  close: require('./CoreAssets/close-x-icon.png'),
  home: require('../assets/icons/shop.png'),
  userAvatar: require('./CoreAssets/default-avatar.jpg'),
  backArrow: require('./CoreAssets/arrow-back-icon.png'),
  creditCardIcon: require('../assets/icons/credit-card-icon.png'),
  jcb: require('../assets/icons/jcb.png'),
  unionpay: require('../assets/icons/unionpay.png'),
  visaPay: require('../assets/icons/mumsy-visa.png'),
  americanExpress: require('../assets/icons/american-express.png'),
  dinersClub: require('../assets/icons/diners-club.png'),
  discover: require('../assets/icons/discover.png'),
  mastercard: require('../assets/icons/mastercard.png'),
  create: require('../assets/icons/mumsy-create.png'),
  shop: require('../assets/icons/mumsy-home.png'),
  foods: require('../assets/icons/mumsy-food-tray.png'),
  shutdown: require('../assets/icons/mumsy-shutdown.png'),
  delivery: require('../assets/icons/mumsy-invoice.png'),
  profile: require('../assets/icons/mumsy-profile.png'),
  menu: require('../assets/icons/mumsy-category.png'),
  search: require('../assets/icons/mumsy-search.png'),
  cart: require('../assets/icons/mumsy-cart.png'),
  reserve: require('../assets/icons/mumsy-booking.png'),
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const sizeSet = {
  buttonWidth: '65%',
  inputWidth: '80%',
  radius: 25,
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet[COLOR_SCHEME].grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 16,
      height: 16,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet[COLOR_SCHEME].inputBgColor,
      borderRadius: 10,
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: '#5ea23a',
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
};

const appleButtonStyle = {
  dark: AppleButton?.Style?.WHITE,
  light: AppleButton?.Style?.BLACK,
  'no-preference': AppleButton?.Style?.WHITE,
};

const StyleDict = {
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  iconSet,
  styleSet,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  appleButtonStyle,
};

export default StyleDict;
