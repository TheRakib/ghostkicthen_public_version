import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
const COLOR_SCHEME = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
  },
  top: {
    position: 'relative',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
  },
  textContainer: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontSize: 18,
    marginBottom: 30,
    position: 'relative',
    top: '15%',
    alignSelf: 'center',
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
    top: '2%',
    marginBottom: 40,
    borderRadius: 10,
    elevation: 3,
  },
  signin: {
    top: 5,
    color: 'black',
    margin: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  formItems: {
    marginTop: 10,
    width: '90%',
  },
  input: {
    fontFamily: DynamicAppStyles.fontFamily.main,
    fontSize: 14,
  },
  workAsMainText: {
    marginTop: 20,
    marginLeft: 20,
  },
  workAs: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 15,
  },
  loginText: {
    color: DynamicAppStyles.colorSet.mainTextColor,
    fontSize: 13,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
  },
  CheckBoxText: {
    fontFamily: DynamicAppStyles.fontFamily.main,
    fontSize: 12,
    marginLeft: -20,
  },
  button: {
    padding: 15,
  },
  mainBtn: {
    backgroundColor: DynamicAppStyles.colorSet.mainThemeForegroundColor,
    borderRadius: 5,
  },
  btnText: {
    color: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontSize: 17,
    fontWeight: 'bold',
  },
  termsCondition: {
    flexDirection: 'row',
    marginTop: 10,
  },
  termsTextBtn: {
    color: DynamicAppStyles.colorSet.grey,
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
    paddingLeft: 9,
    paddingRight: 9,
  },
});

export default styles;
