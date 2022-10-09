import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import { overrideCart } from '../../Core/cart/redux/actions';
import { updateOrders } from '../../Core/delivery/redux';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { VENDOR_ORDERS } from '../../Configuration';
import VendorAppConfig from '../../VendorAppConfig';
import { TNEmptyStateView } from '../../Core/truly-native';

class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    navigation.setOptions({
      title: IMLocalized('Orders'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
    this.COLOR_SCHEME = Appearance.getColorScheme();
    this.ref = firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .where('authorID', '==', this.props.user.id)
      .orderBy('createdAt', 'desc');

    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    console.log('info');
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate, (error) => {
      console.log(error);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onReorderPress = (item) => {
    this.props.overrideCart(item.products);
    this.props.navigation.navigate('Cart', {
      appStyles: DynamicAppStyles,
      appConfig: VendorAppConfig,
    });
  };

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    this.setState({ loading: true });
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        ...docData,
      });
    });

    this.props.updateOrders(data);
    this.setState({
      data,
      loading: false,
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        this.props.navigation.navigate('OrderTrackingScreen', {
          item,
          appStyles: DynamicAppStyles,
        })
      }>
      <View>
        {item != null &&
          item.products != null &&
          item.products[0] != null &&
          item.products[0].photo != null &&
          item.products[0].photo.length > 0 && (
            <FastImage
              placeholderColor={
                DynamicAppStyles.colorSet[this.COLOR_SCHEME].grey9
              }
              style={styles.photo}
              source={{ uri: item.products[0].photo }}
            />
          )}
        <View style={styles.overlay} />
        <Text style={styles.headerTitle}>
          {item?.createdAt
            ? new Date(item.createdAt.toDate()).toDateString()
            : ''}{' '}
          -{' '}
          {item.status === 'Order Accepted' ||
          item.status === 'Order Pick Up Accepted' ||
          item.status === 'Order Self Delivery Accepted'
            ? 'Prepering Your order'
            : item.status === 'Order Is Ready'
            ? 'Your Order Is Ready To Be Picked'
            : item.status}
        </Text>
      </View>
      {item.products.map((food) => {
        return (
          <View style={styles.rowContainer} key={food.id}>
            <Text style={styles.count}>{food.quantity}</Text>
            <Text style={styles.title}>{food.name}</Text>
            <Text style={styles.price}>{food.price} Kr</Text>
          </View>
        );
      })}
      <View style={styles.actionContainer}>
        <Text style={styles.total}>
          {IMLocalized('Total')}:{' '}
          {item.products
            .reduce((prev, next) => prev + next.price * next.quantity, 0)
            .toFixed(2)}{' '}
          Kr
        </Text>
        <Button
          containerStyle={styles.actionButtonContainer}
          style={styles.actionButtonText}
          onPress={() => this.onReorderPress(item)}>
          {IMLocalized('Reorder')}
        </Button>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { item } = this.state;
    const emptyStateConfig = {
      title: IMLocalized('No Orders'),
      description: IMLocalized(
        'Du har inte gjort några beställningar ännu. Dina beställningar kommer att visas här.',
      ),
    };
    return (
      <>
        {this.state.data?.length === 0 && !this.state.loading && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={DynamicAppStyles}
            />
          </View>
        )}
        <FlatList
          style={styles.flat}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={5}
        />
      </>
    );
  }
}

OrderListScreen.propTypes = {
  user: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

// export default CartScreen;
const mapStateToProps = (state) => ({
  user: state.auth.user,
  orderList: state.orders.orderList,
});

export default connect(mapStateToProps, { overrideCart, updateOrders })(
  OrderListScreen,
);
