import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 40,
      /*    tintColor: 'white', */
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFCB34',
    },
    button: {
      color: 'white',
      justifyContent: 'center',
      fontSize: 16,
    },
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
  });
};

export default dynamicStyles;
