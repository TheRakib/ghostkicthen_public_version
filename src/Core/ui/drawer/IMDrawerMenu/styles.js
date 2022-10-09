import { StyleSheet, Platform } from 'react-native';
import styles from '../MenuButton/styles';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from 'react-native-responsive-screen';

const dynamicStyles = (appStyles, colorScheme) => {
  const colorSet = appStyles.colorSet[colorScheme];
  const fontSet = appStyles.fontFamily;
  return new StyleSheet.create({
    content: {
      flex: 1,
      height: h('100%'),
    },
    header: {
      height: Platform.OS === 'ios' ? '13%' : '15%',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 15,
      alignItems: 'center',
    },

    info: {
      fontFamily: fontSet.main,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#2F313F',
    },
    phone: {
      flexDirection: 'column',
      ...Platform.select({
        ios: {
          marginTop: '20%',
          marginLeft: '10%',
        },
        android: {
          marginTop: '10%',
          marginLeft: '10%',
        },
      }),
    },
    phoneText: {
      fontSize: 13,
      color: colorSet.mainTextColor,
    },
    imageContainer: {
      height: 40,
      width: 40,
      borderRadius: 50,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          marginTop: '20%',
          marginBottom: '5%',
        },
        android: {
          marginTop: '10%',
          marginBottom: '5%',
        },
      }),
    },
    container: {
      marginTop: '5%',
      marginLeft: '5%',
    },
    line: {
      borderBottomColor: colorSet.grey9,
      borderBottomWidth: 0.4,
      width: '90%',
      marginTop: '-9%',
      marginBottom: '10%',
      marginLeft: '2%',
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignSelf: 'center',
      marginBottom: '20%',
    },
    textFooter: {
      color: '#fff',
      fontFamily: fontSet.main,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    btnContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: '15%',
    },
    workWithUs: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 70,
      borderRadius: 5,
      backgroundColor: '#FFCB34',
    },

    switchRoleBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      width: w(55),
      elevation: 4,
      borderRadius: 5,
      backgroundColor: '#FFCB34',
    },
    innerBtnText: {
      textAlign: 'center',
      fontSize: 15,
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#fff',
    },
    roleBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
};

export default dynamicStyles;
