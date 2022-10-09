import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
import { Appearance } from 'react-native-appearance';
import { StyleSheet, I18nManager } from 'react-native';
import DynamicStyles from '../../../../DynamicAppStyles';
const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: w(100),
      height: h(100),
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      alignSelf: 'center',
      paddingTop: 20,
    },
    modal: {
      justifyContent: 'flex-start',
    },
    mainText: {
      textAlign: 'center',
      fontFamily: DynamicStyles.fontFamily.normal,
      fontSize: 20,
      margin: 15,
      fontWeight: 'bold',
    },
    horizontalPane: {
      padding: 5,
      marginVertical: 10,
      alignItems: 'center',
    },
    textInputLabel: {
      fontSize: 14,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      width: w(100),
      textAlign: 'left',
      marginLeft: '20%',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    textInput: {
      fontSize: appStyles.fontSet.normal,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      width: w(80),
      textAlign: 'left',
      height: 45,
      borderWidth: 1,
      borderColor: appStyles.colorSet[COLOR_SCHEME].grey3,
      paddingLeft: 15,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    textAreaContainer: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5,
    },
    textArea: {
      height: 150,
      justifyContent: 'flex-start',
    },
    actionButtonContainer: {
      padding: 16,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      marginVertical: 30,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    lazyLoading: {
      height: 78,
      margin: -27,
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
  });

export default dynamicStyles;
