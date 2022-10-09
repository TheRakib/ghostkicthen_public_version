import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';

const COLOR_SCHEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      paddingTop: 10,
    },
    sectionTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16,
    },
    subMainTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 14,
      marginHorizontal: 16,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    subText: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 16,
      marginHorizontal: 16,
    },
    vendorTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 14,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    line: {
      marginHorizontal: 16,
      height: 0.5,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].hairlineColor,
      marginVertical: 16,
      alignSelf: 'stretch',
    },
    divider: {
      width: '100%',
      height: 8,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].grey0,
      marginTop: 15,
    },
    horizontalPane: {
      margin: 8,
      marginLeft: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    receipts: {
      fontSize: 1,
      color: appStyles.colorSet[COLOR_SCHEME].grey9,
    },
    orderPane: {
      flexDirection: 'row',
      marginTop: 15,
      marginLeft: 16,
      marginBottom: 3,
      alignItems: 'center',
    },
    qty: {
      padding: 4,
      backgroundColor: '#EDEEED',
      marginRight: 16,
      borderRadius: 3,
      fontSize: 14,
      width: 20,
      textAlign: 'center',
    },
    productItem: {
      fontSize: 16,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      marginTop: -1,
    },
    totalText: {
      fontSize: 18,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontWeight: 'bold',
      marginLeft: 8,
      marginTop: 10,
    },
    totalPrice: {
      fontSize: 20,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      marginLeft: 8,
      marginRight: 16,
      marginTop: 10,
    },
    price: {
      fontSize: 16,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    showMoreContainer: {
      marginHorizontal: 12,
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },
    showMoreText: {
      fontSize: 16,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    medalTextContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    medalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginTop: 20,
      alignItems: 'center',
    },
    medalImage: {
      width: 20,
      height: 20,
    },
    nextReward: {
      fontSize: 16,
      color: appStyles.colorSet[COLOR_SCHEME].grey0,
      paddingRight: 3,
    },
    carImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      resizeMode: 'center',
    },
    imagesContainer: {
      flexDirection: 'row',
    },
    driverImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      resizeMode: 'center',
      borderWidth: 3,
      borderColor: appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      marginRight: -7,
      zIndex: 1000,
    },
    callButton: {
      width: 44,
      height: 44,
      backgroundColor: '#EDEEED',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    messageButton: {
      width: 250,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 16,
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: '#EDEEED',
      marginRight: 15,
      borderRadius: 22,
      fontSize: 16,
      textAlign: 'left',
      alignSelf: 'center',
      color: '#333333',
      fontWeight: 'bold',
      overflow: 'hidden',
    },
    contactPane: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 8,
      marginHorizontal: 16,
      marginTop: 8,
      alignItems: 'center',
    },
    driverTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 14,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    driverContainer: {
      marginHorizontal: 16,
      marginTop: 16,
    },
    plateNum: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    overlay: {
      bottom: 15,
      width: w(100),
      elevation: 4,
      shadowOffset: { width: 4, height: 4 },
    },
  });

export default styles;
