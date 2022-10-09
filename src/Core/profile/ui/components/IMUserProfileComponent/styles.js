import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const imageSize = height * 0.14;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingTop: 30,
    },
    buttonContainer: {
      height: 50,
      width: '100%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
    userInfo: {
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 50,
    },
    userInfoText: {
      fontSize: 15,
      marginTop: 10,
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    logout: {
      marginBottom: 40,
      justifyContent: 'flex-end',
      width: '90%',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 18,
      paddingVertical: 15,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });
};

export default dynamicStyles;
