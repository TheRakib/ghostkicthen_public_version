import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import { removeFromCart, overrideCart, updateCart } from '../../redux/actions';
import { IMLocalized } from '../../../localization/IMLocalization';
import { TNEmptyStateView } from '../../../truly-native';
import EditCartModal from '../../components/EditCartModal/IMEditCartModal';
import { storeCartToDisk } from '../../redux/reducers';
import { Appearance } from 'react-native-appearance';
import InfoModal from 'react-native-modal';

const COLOR_SCHEME = Appearance.getColorScheme();
class CartScreen extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: IMLocalized('Your shopping cart'),
      headerRight: () => <View />,
    });

    this.state = {
      item: {},
      isVisible: false,
      id: 0,
      placeOrderVisible: false,
    };
  }

  renderFooter = () => {
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);

    return (
      <>
        <View style={styles.container}>
          <View>
            <Text style={styles.subText}>
              {IMLocalized('Click on the product you want to change')}
            </Text>
            <View
              style={[styles.bottomLine, { width: '95%', alignSelf: 'center' }]}
            />
          </View>

          <View style={[styles.rowContainer, { marginTop: 20 }]}>
            <Text style={[styles.title, { fontWeight: 'bold', fontSize: 17 }]}>
              {IMLocalized('Total')}
            </Text>

            <Text style={[styles.price, { fontWeight: 'bold' }]}>
              {this.props.cartItems
                .reduce((prev, next) => prev + next.price * next.quantity, 0)
                .toFixed(2)}{' '}
              Kr
            </Text>
          </View>
        </View>
      </>
    );
  };

  onItemPress = (item, id) => {
    this.setState({ id });
    this.setState({ item });
    this.setState({ isVisible: true });
  };

  onPress = () => {
    if (this.props.user.email === '' || !this.props.user.email) {
      Alert.alert(
        IMLocalized('Please add an email'),
        IMLocalized('Menu -> Profile -> Account details'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return false;
    }
    if (this.props.user.phone === '' || !this.props.user.phone) {
      Alert.alert(
        IMLocalized('Please add a phone number'),
        IMLocalized('Menu -> Profile -> Account details'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return false;
    }
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const appConfig = route.params.appConfig;
    navigation.navigate('AddAddress', { appStyles, appConfig });
  };

  renderItem = ({ item }) => {
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);
    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => this.onItemPress(item)}
          style={styles.container}>
          <View style={styles.CartFlexBox}>
            <View style={styles.rowContainer} key={item.id}>
              <Text style={styles.count}>
                {item.quantity}
                {'  '}x
              </Text>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price} kr</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  };

  render() {
    const { item, isVisible, id } = this.state;
    const { route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);
    const emptyStateConfig = {
      title: IMLocalized('Your shopping cart is empty'),
      description: IMLocalized(
        "Looks like you haven't added anything to your cart yet",
      ),
    };

    return (
      <View style={styles.container}>
        <EditCartModal
          item={item}
          id={id}
          style={styles}
          appStyles={appStyles}
          close={() => this.setState({ isVisible: false })}
          deleteCart={() => {
            this.setState({ isVisible: false });
            this.props.removeFromCart(item);
          }}
          updateCart={(newCartItem, newCartid) =>
            this.props.updateCart(newCartItem, newCartid)
          }
          isVisible={isVisible}
          onModalHide={async () =>
            storeCartToDisk(this.props.cartItems, this.props.cartVendor)
          }
        />
        {this.props.cartItems.length > 0 && (
          <FlatList
            style={styles.flat}
            data={this.props.cartItems}
            renderItem={this.renderItem}
            keyExtractor={(singleCartItem) => `${singleCartItem.id}`}
            ListFooterComponent={this.renderFooter}
          />
        )}
        {this.props.cartItems.length === 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={appStyles}
            />
          </View>
        )}

        {this.props.cartItems.length > 0 && (
          <Button
            containerStyle={styles.actionButtonContainer}
            style={styles.actionButtonText}
            onPress={() => this.onPress()}>
            {IMLocalized('Proceed to checkout')}
          </Button>
        )}
      </View>
    );
  }
}

CartScreen.propTypes = {
  user: PropTypes.shape(),
  cartItems: PropTypes.array,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  cartVendor: state.cart.vendor,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  removeFromCart,
  overrideCart,
  updateCart,
})(CartScreen);
