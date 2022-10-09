import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    checkoutTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      margin: 20,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      width: '100%',
      borderTopWidth: 0.5,
      borderTopColor: 'grey',
    },
    optionTile: {
      color: '#000',
      fontSize: 16,
      fontWeight: '900',
    },
    options: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 16,
      fontWeight: '900',
    },
    container: {
      flex: 1,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },
    actionButtonContainer: {
      padding: 30,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      fontWeight: 'bold',
      color: 'white',
      fontSize: 19,
    },
    rowContainer: {
      flexDirection: 'row',
      marginLeft: '5%',
    },
    count: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: appStyles.fontFamily.bold,
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    price: {
      padding: 10,
      color: 'black',
      fontFamily: appStyles.fontFamily.main,
      textAlign: 'center',
      fontSize: 14,
    },
    title: {
      padding: 10,
      color: 'black',
      fontFamily: appStyles.fontFamily.main,
      textAlign: 'left',
      fontSize: 14,
      fontWeight: 'bold',
    },

    CartFlexBox: {
      /* flex: 1, */
    },
    deliveryOptions: {
      flex: 1,
      justifyContent: 'flex-end',
    },

    deliveryOptionsContainer: {
      flexDirection: 'row',
      paddingTop: 10,
    },

    deliveryOptionsBtn: {
      padding: 10,
      borderWidth: 1.5,
      borderColor: '#BFBFBF',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 30,
      width: 90,
      alignItems: 'center',
      marginLeft: 10,
    },

    deliveryOptionsBtnActive: {
      padding: 10,
      borderWidth: 1.5,
      borderColor: '#FFCB34',
      backgroundColor: '#fff',
      elevation: 1.5,
      borderRadius: 8,
      width: 90,
      alignItems: 'center',
      marginLeft: 10,
    },

    deliveryOptionsText: {
      fontWeight: 'bold',
    },
  });

export default dynamicStyles;
