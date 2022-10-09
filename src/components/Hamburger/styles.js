import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';
import DynamicAppStyles from '../../DynamicAppStyles';
const theme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    margin: 5,
    tintColor: '#000',
  },
});

export default styles;
