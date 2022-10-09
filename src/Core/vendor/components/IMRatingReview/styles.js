import { StyleSheet } from 'react-native';
const styles = (appStyles) =>
  StyleSheet.create({
    rating: {
      marginLeft: 6,
      fontSize: 14,
      color: appStyles.colorSet.light.mainTextColor,
    },
    pris: {
      fontSize: 13,
      color: appStyles.colorSet.light.mainTextColor,
    },
    image: {
      marginTop: 0.5,
      height: 16,
      width: 16,
    },
    container: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: 'row',
      color: appStyles.colorSet.light.grey,
    },
  });

export default styles;
