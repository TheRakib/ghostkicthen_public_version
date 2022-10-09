import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const THEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 5,
      width: '100%',
      backgroundColor: appStyles.colorSet[THEME].mainThemeBackgroundColor,
    },
    textInput: {
      width: 250,
      marginTop: 3,
      marginBottom: 3,
      fontSize: 16,
      color: appStyles.colorSet[THEME].mainTextColor,
    },
    mainText: {
      fontSize: 16,
      marginTop: 3,
      color: appStyles.colorSet[THEME].mainTextColor,
    },
    button: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      borderRadius: 4,
      backgroundColor: appStyles.colorSet[THEME].mainThemeForegroundColor,
      height: 50,
      textAlignVertical: 'center',
    },
    mapIcon: {
      alignSelf: 'flex-start',
      margin: 10,
    },
    map: {
      width: 300,
      height: 300,
      alignSelf: 'center',
      marginVertical: 20,
    },
  });

export default styles;
