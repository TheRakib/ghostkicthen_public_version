import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: -100,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 50,
      marginBottom: 20,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      height: 45,
    },
    loginText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    signupContainer: {
      justifyContent: 'center',
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 1 : 1.5,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      height: 45,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontWeight: 'bold',
    },
    dismissButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
  });
};

export default dynamicStyles;
