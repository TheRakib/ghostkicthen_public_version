import { StyleSheet } from 'react-native';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    icon: {
      /*   alignSelf: 'center',
      height: 200,
      width: 200,
      marginTop: 20,
      marginBottom: 30,
      tintColor: '#3E3E3E', */
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      alignSelf: 'center',
      color: '#3E3E3E',
      marginBottom: 15,
    },
    description: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
      textAlign: 'center',
      width: '85%',
      fontSize: 16,
      lineHeight: 25,
    },
    buttonContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: '75%',
      height: 45,
      alignSelf: 'center',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonName: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    container: {
      height: h(100),
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackground,
    },
  });
};

export default dynamicStyles;
