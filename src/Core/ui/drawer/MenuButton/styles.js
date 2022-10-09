import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  const colorSet = appStyles.colorSet[colorScheme];
  const fontSet = appStyles.fontFamily;
  return new StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 7,
      marginTop: 10,
      marginBottom: 0,
      backgroundColor: '#fff',
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 5,
    },
    btnIcon: {
      height: 27,
      width: 27,
      tintColor: '#585858',
    },
    btnText: {
      fontFamily: fontSet.main,
      marginLeft: 20,
      marginTop: 5,
      color: colorSet.mainTextColor,
      fontSize: 17,
    },
  });
};

export default dynamicStyles;
