import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from 'react-native-responsive-screen';
import dynamicStyles from '../../components/AddProduct/styles';
const COLOR_SCHEME = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    marginHorizontal: 5,
  },
  iconContainer: { flexDirection: 'row' },
  emptyState: {
    fontSize: DynamicAppStyles.fontSet.normal,
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: h(40),
    textAlign: 'center',
    width: 300,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: h(2),
  },
  emptyViewContainer: {
    /* marginTop: '25%', */
    flex: 1,
  },
  deleteModalView: {
    width: w(100),
    height: h(40),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: w(3),
    borderTopLeftRadius: w(3),
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
  },
  deleteModalContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: w(100),
    marginTop: h(60),
    alignSelf: 'center',
  },
  deleteModalDescription: {
    fontSize: 18,
  },
  deleteModalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
  },
  addButtonContainer: {
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
  },
  cancelButton: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    fontWeight: '500',
  },
  reserveButton: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    fontSize: 16,
    marginHorizontal: 4,
  },
  subtitleView: {
    paddingTop: 5,
    width: '100%',
  },
  description: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    marginTop: 10,
    textAlign: 'right',
  },
  rightIcon: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },

  item: {
    padding: 3,
    backgroundColor: DynamicAppStyles.colorSet.mainThemeForegroundColor,
    elevation: 1,
    fontSize: 11,
    color: '#fff',
    marginTop: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    color: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
  },

  foodInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
