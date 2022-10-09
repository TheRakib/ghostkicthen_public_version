import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
  },
  container: {
    marginBottom: 30,
    flex: 1,
    padding: 10,
  },
  photo: {
    width: '100%',
    height: 120,
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  headerTitle: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  count: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    borderWidth: 1,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    borderColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    borderWidth: 1,
    borderRadius: 3,
  },
  price: {
    padding: 10,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    padding: 10,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  total: {
    flex: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    padding: 5,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    borderColor: DynamicAppStyles.colorSet.grey3,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 3,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
  },
  actionButtonText: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    fontSize: 12,
    fontFamily: DynamicAppStyles.fontFamily.bold,
  },
  emptyViewContainer: {
    justifyContent: 'center',
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
  },
});

export default styles;
