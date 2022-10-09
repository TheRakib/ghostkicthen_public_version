import { Appearance } from 'react-native-appearance';
import { StyleSheet } from 'react-native';

const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      marginVertical: 2,
      paddingVertical: 5,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    visaIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    cardText: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#000',
    },
    tick: {
      width: 20,
      height: 20,
      marginHorizontal: 10,
    },
    actionButtonContainer: {
      padding: 16,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      marginVertical: 30,
      borderRadius: 5,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      color: 'white',
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 10,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },
    cardImage: {
      width: 200,
      height: 150,
      marginVertical: 25,
      alignSelf: 'center',
    },
    line: {
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      height: 0.5,
      width: '100%',
      opacity: 0.4,
      marginVertical: 3,
    },
  });

export default dynamicStyles;
