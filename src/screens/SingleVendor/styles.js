import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
const COLOR_SCHEME = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    flex: 1,
  },
  icon: {
    width: 27,
    height: 27,
    tintColor: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    marginTop: 10,
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
    margin: 0,
  },
  emptyViewContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    fontWeight: '500',
  },
  reserveButton: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    fontSize: 16,
    marginHorizontal: 4,
  },
  foodList: {
    borderWidth: 1,
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
  },
  item: {
    padding: 2,
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    fontSize: 12,
    color: '#fff',
    marginTop: 10,
    borderRadius: 5,
  },
  rightIcon: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },

  image: {
    marginTop: 5,
    height: 20,
    width: 16,
  },
  foodInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
