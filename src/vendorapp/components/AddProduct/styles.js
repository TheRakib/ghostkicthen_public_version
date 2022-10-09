import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../../DynamicAppStyles';

const dynamicStyles = (colorScheme) => {
  return StyleSheet.create({
    navBarContainer: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    body: {
      flex: 1,
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    divider: {
      height: 10,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].hairlineColor,
    },
    container: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      height: 65,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: DynamicAppStyles.colorSet[colorScheme].hairlineColor,
    },
    selectorRightButton: {
      marginRight: 10,
    },
    sectionTitle: {
      textAlign: 'left',
      alignItems: 'center',
      color: DynamicAppStyles.colorSet[colorScheme].title,
      fontSize: 19,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 7,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      fontSize: 19,
      padding: 10,
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
      paddingRight: 0,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      color: DynamicAppStyles.colorSet[colorScheme].text,
    },

    modalInput: {
      flex: 1,
      borderRadius: 5,
      borderColor: DynamicAppStyles.colorSet[colorScheme].grey,
      borderWidth: 0.5,
      height: 40,
      padding: 5,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      color: DynamicAppStyles.colorSet[colorScheme].text,
    },
    priceInput: {
      flex: 1,
      borderRadius: 5,
      borderColor: DynamicAppStyles.colorSet[colorScheme].grey,
      borderWidth: 0.5,
      height: 40,
      textAlign: 'right',
      paddingRight: 5,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      color: DynamicAppStyles.colorSet[colorScheme].text,
    },
    title: {
      flex: 2,
      textAlign: 'left',
      alignItems: 'center',
      color: DynamicAppStyles.colorSet[colorScheme].title,
      fontSize: 19,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      fontWeight: 'bold',
    },
    value: {
      /*  marginTop: 5, */
      textAlign: 'right',
      color: DynamicAppStyles.colorSet[colorScheme].grey,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
    },
    section: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginBottom: 10,
    },
    row: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 15,
    },

    addPhotoTitle: {
      color: DynamicAppStyles.colorSet[colorScheme].title,
      fontSize: 19,
      paddingLeft: 10,
      marginTop: 10,
      fontFamily: DynamicAppStyles.fontFamily.regularFont,
      fontWeight: 'bold',
    },
    photoList: {
      height: 70,
      marginTop: 20,
      marginRight: 10,
    },
    location: {
      // alignItems: 'center',
      width: '50%',
    },
    photo: {
      marginLeft: 10,
      width: 70,
      height: 70,
      borderRadius: 10,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    photoIcon: {
      width: 50,
      height: 50,
    },
    addButtonContainer: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 5,
      padding: 15,
      margin: 10,
      marginVertical: 27,
    },
    activityIndicatorContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    addButtonText: {
      color: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontWeight: 'bold',
      fontSize: 15,
    },
    optionTextStyle: {
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 16,
      fontFamily: 'FontAwesome',
    },
    selectedItemTextStyle: {
      fontSize: 18,
      color: '#FFCB34',
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },
    optionContainerStyle: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    cancelContainerStyle: {
      backgroundColor:
        DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderRadius: 10,
    },
    sectionTextStyle: {
      fontSize: 21,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: 'FontAwesome',
      fontWeight: 'bold',
    },

    cancelTextStyle: {
      fontSize: 21,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    bar: {
      height: 50,
      marginTop: Platform.OS === 'ios' ? 30 : 0,
      justifyContent: 'center',
    },
    headerTitle: {
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      fontWeight: 'bold',
      fontSize: 20,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: 'FontAwesome',
    },
    rightButton: {
      top: 0,
      right: 0,
      backgroundColor: 'transparent',
      alignSelf: 'flex-end',
      color: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontWeight: 'normal',
      fontFamily: 'FontAwesome',
    },
    chooseDeliveryContainer: {
      flexDirection: 'column',
      padding: 20,
    },
    chooseDeliveryBtn: {
      alignItems: 'center',
      padding: 15,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#C0C0C0',
    },
    chooseDeliveryBtnActive: {
      alignItems: 'center',
      padding: 15,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#FFCB34',
      elevation: 1,
      backgroundColor: '#fff',
    },
    chooseDeliveryText: {
      fontSize: 15,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    chooseDeliveryTextActive: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#1D1D1D',
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    icon: {
      paddingTop: 5,
      marginLeft: -13,
    },
    modalDeliveryContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalDelivery: {
      width: '100%',
      height: 210,
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    modalDeliveryMainText: {
      fontSize: 18,
      marginTop: 11,
      marginLeft: 12,
      fontWeight: 'bold',
    },
    modalDeliveryText: {
      fontSize: 13,
      marginTop: 15,
      marginLeft: 15,
      paddingRight: 20,
      lineHeight: 18,
    },
  });
};
export default dynamicStyles;
