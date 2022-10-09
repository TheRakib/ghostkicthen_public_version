import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const THEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 5,
      backgroundColor: appStyles.colorSet[THEME].mainThemeBackgroundColor,
    },
    subText: {
      fontSize: 14,
      marginTop: 3,
      color: appStyles.colorSet[THEME].mainSubtextColor,
    },
    mainText: {
      fontSize: 16,
      marginTop: 3,
      color: appStyles.colorSet[THEME].mainTextColor,
    },
    divider: {
      width: '100%',
      height: 10,
      backgroundColor: appStyles.colorSet[THEME].whiteSmoke,
      marginVertical: 5,
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
  });

export default styles;
