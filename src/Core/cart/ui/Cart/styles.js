import { reduce } from 'lodash';
import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },

    bottomLine: {
      borderBottomColor: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      borderBottomWidth: 0.2,
    },
    emptyTitle: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    flat: {
      flex: 1,
      margin: 10,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    count: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: appStyles.fontFamily.bold,
      paddingLeft: 5,
      paddingRight: 5,
      textAlign: 'center',
      color: 'black',
      fontSize: 17,
    },
    price: {
      padding: 10,
      color: 'black',
      fontFamily: appStyles.fontFamily.main,
      textAlign: 'center',
      fontSize: 17,
    },
    title: {
      flex: 1,
      padding: 10,
      color: 'black',
      fontFamily: appStyles.fontFamily.main,
      textAlign: 'left',
      fontSize: 16,
    },
    leveransTitle: {
      flex: 1,
      padding: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      textAlign: 'left',
      fontSize: 15,
    },
    subText: {
      textAlign: 'center',
      padding: 10,
      fontSize: 13,
      marginTop: 5,
      marginBottom: 8,
      color: '#A8A8A8',
      fontFamily: appStyles.fontFamily.bold,
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
    emptyViewContainer: {
      justifyContent: 'center',
      flex: 1,
    },
    CartFlexBox: {
      marginHorizontal: 5,
      padding: 7,
    },
  });

export default styles;
