import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    flat: {
      flex: 1,
      color: appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },
    container: {
      marginBottom: 30,
      flex: 1,
      padding: 10,
    },
    photo: {
      width: '100%',
      height: 100,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    rowContainer: {
      flexDirection: 'row',
    },
    count: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
      borderWidth: 1,
      fontWeight: 'bold',
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 2,
      paddingBottom: 2,
      textAlign: 'center',
      color: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      borderColor: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      borderWidth: 1,
      borderRadius: 3,
    },
    price: {
      padding: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontFamily: appStyles.fontFamily.bold,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title: {
      flex: 1,
      padding: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontFamily: appStyles.fontFamily.bold,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 30,
    },
    total: {
      flex: 4,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: appStyles.fontFamily.bold,
      fontWeight: 'bold',
      padding: 5,
      textAlign: 'center',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      borderColor: appStyles.colorSet.grey3,
    },
    actionButtonContainer: {
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 50,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    actionButtonText: {
      color: appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      fontSize: 12,
      fontFamily: appStyles.fontFamily.bold,
    },
  });

export default styles;
