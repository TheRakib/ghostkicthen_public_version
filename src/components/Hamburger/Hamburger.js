import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import DynamicAppStyles from '../../DynamicAppStyles';

export default class Hamburger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.headerButtonContainer}
        onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={DynamicAppStyles.iconSet.menuHamburger}
        />
      </TouchableOpacity>
    );
  }
}

Hamburger.propTypes = {
  onPress: PropTypes.func,
};
