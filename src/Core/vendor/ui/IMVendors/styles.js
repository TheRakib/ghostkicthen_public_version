import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { Appearance } from 'react-native-appearance';
const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    vendorItemContainer: {
      flex: 1,
      backgroundColor: 'white',
      marginHorizontal: 15,
      marginBottom: 20,
      display: 'flex',
      alignSelf: 'center',
      borderRadius: 8,
    },
    foodPhoto: {
      width: '100%',
      height: 170,
      borderRadius: 8,
    },
    foodInfo: {
      marginTop: 10,
      flexDirection: 'column',
    },
    foodName: {
      flex: 1,
      fontFamily: appStyles.fontFamily.bold,
      textAlign: 'left',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 18,
      marginHorizontal: 10,
      marginTop: 10,
    },
    ReviewName: {
      alignSelf: 'flex-end',
      marginHorizontal: 5,
    },
    foodPrice: {
      fontFamily: appStyles.fontFamily.bold,
      textAlign: 'right',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      marginBottom: 200,
    },
    description: {
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontSize: 13,
      marginHorizontal: 10,
      marginTop: 10,
    },
    restaurantClosed: {
      opacity: 0.5,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default dynamicStyles;
