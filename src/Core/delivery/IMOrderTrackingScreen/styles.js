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
      paddingTop: 20,
    },
    overlay: {
      bottom: 15,
      width: w(100),
      elevation: 4,
      shadowOffset: { width: 4, height: 4 },
    },
    upperPane: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginHorizontal: 10,
    },
    subMainTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 14,
      marginHorizontal: 16,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    sectionTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16,
    },
    subText: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 16,
      marginHorizontal: 16,
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
    vendorTitle: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 14,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    thankYou: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16,
      textAlign: 'center',
      lineHeight: 30,
    },
    callVendorBtn: {
      marginTop: '5%',
      marginLeft: '3%',
      padding: 10,
      paddingHorizontal: 10,
      backgroundColor: '#ffcb43',
      marginRight: 15,
      borderRadius: 15,
      alignSelf: 'flex-start',
    },
    reviewBtn: {
      padding: 10,
      paddingHorizontal: 10,
      backgroundColor: '#333',
      marginRight: 15,
      borderRadius: 10,
      alignSelf: 'center',
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
    time: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    pickUpStatus: {
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: -20,
    },
    eta: {
      fontSize: 14,
      marginHorizontal: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontWeight: 'bold',
      marginBottom: -3,
    },
    filled: {
      width: 20,
      height: 4,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    unfilled: {
      width: 20,
      height: 4,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    progressPane: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 20,
      marginHorizontal: 10,
    },
    prepText: {
      fontSize: 18,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      paddingRight: 5,
      marginHorizontal: 10,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bar: {
      marginVertical: 20,
      alignSelf: 'center',
      marginHorizontal: 10,
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginVertical: 100,
      elevation: 4,
      shadowOffset: { width: 4, height: 4 },
    },
    cookingImage: {
      width: 350,
      height: 350,
      alignSelf: 'center',
      marginVertical: 10,
    },
    mapStyle: {
      width: '100%',
      height: 300,
      marginVertical: 20,
    },
    scroll: {
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },
    mapCarIcon: {
      height: 32,
      width: 32,
      tintColor: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    markerTitle: {
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 12,
      fontWeight: 'bold',
      alignItems: 'center',
      overflow: 'visible',
    },
    marker: {
      overflow: 'visible',
    },
  });

export default styles;
