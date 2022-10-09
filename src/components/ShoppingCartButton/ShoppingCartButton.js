import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';

class ShoppingCartButton extends React.Component {
  render() {
    const { cartItems } = this.props;
    const theme = Appearance.getColorScheme();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <IconBadge
            MainElement={
              <Image
                source={require('../../../assets/icons/mumsy-shopping-cart.png')}
                style={{
                  width: 27,
                  height: 27,
                  margin: 10,
                }}
              />
            }
            BadgeElement={
              <Text style={{ color: '#FFFFFF' }}>
                {cartItems.reduce((prev, next) => prev + next.quantity, 0)}
              </Text>
            }
            Hidden={cartItems.length === 0}
            IconBadgeStyle={{
              width: 20,
              height: 20,
              backgroundColor: '#00BF0D',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
});

ShoppingCartButton.propTypes = {
  onPress: PropTypes.func,
  cartItems: PropTypes.array,
};

export default connect(mapStateToProps)(ShoppingCartButton);
