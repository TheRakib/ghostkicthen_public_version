import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    //Profile Settings
    settingsTitleContainer: {
      width: '100%',
      height: 60,
      justifyContent: 'flex-end',
    },
    settingsTitle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      paddingLeft: 10,
      fontSize: 15,
      paddingBottom: 6,
      fontWeight: '500',
    },
    settingsTypesContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    settingsTypeContainer: {
      borderBottomColor: appStyles.colorSet[colorScheme].whiteSmoke,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    settingsType: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
    },

    //Edit Profile
    contentContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    divider: {
      height: 0.5,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
    },
    text: {
      fontSize: 14,
      color: '#000',
    },

    //app Settings
    appSettingsTypeContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    appSettingsSaveContainer: {
      height: 50,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: '80%',
      alignSelf: 'center',
      borderRadius: 5,
      marginTop: 30,
    },
    placeholderTextColor: {
      color: appStyles.colorSet[colorScheme].hairlineColor,
    },
  });
};

export default dynamicStyles;
