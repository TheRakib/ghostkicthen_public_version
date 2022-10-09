import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen';
import styles from './styles';
import { storeCartToDisk } from '../../Core/cart/redux/reducers';
import { connect, useSelector } from 'react-redux';
import VendorAppConfig from './../../VendorAppConfig';
import ShoppingCartButton from '../../components/ShoppingCartButton/ShoppingCartButton';
import IconBadge from 'react-native-icon-badge';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import { getCurrentLocation } from '../../Core/onboarding/utils/authManager';
import { getDistance } from '../../Core/vendor/api/distance';

function SingleVendorScreen(props) {
  const { navigation, route } = props;

  const singleVendor = route.params.vendor;
  const singleCategory = route.params.category; // used only for single vendor config

  const emptyStateConfig = {
    title: IMLocalized('No Products'),
    description: IMLocalized(
      'Det finns för närvarande inga produkter under denna Food Artist. Vänta tills de har slutfört sin profil.',
    ),
  };

  const [data, setData] = useState([]);
  const [refreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendor] = useState(singleVendor);
  const [category] = useState(singleCategory);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartVendor = useSelector((state) => state.cart.vendor);

  let current_location = null;
  getCurrentLocation(Geolocation).then(async (location) => {
    current_location = location;
  });

  // const ref = useRef(null);

  const ref = VendorAppConfig.isMultiVendorEnabled
    ? useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('vendorID', '==', vendor.id),
      )
    : useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('categoryID', '==', category?.id),
      );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: vendor?.title || category?.title,
      headerRight: () => <View />,
    });

    if (VendorAppConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.iconContainer}>
            {/* Denna kod ska användas när catering erbjuds då du kan reservera catering och inte till single food */}
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReservationScreen', {
                  vendor: vendor,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/mumsy-reserve.png')}
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reviews', {
                  entityID: vendor.id,
                  appStyles: DynamicAppStyles,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/mumsy-review.png')}
              />
            </TouchableOpacity>

            <ShoppingCartButton
              onPress={() => {
                navigation.navigate('Cart', {
                  appStyles: DynamicAppStyles,
                  appConfig: VendorAppConfig,
                });
              }}
            />
          </View>
        ),
      });
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = ref.current.onSnapshot(onCollectionUpdate);

    return () => {
      unsubscribe();
    };
  }, [ref]);

  const onCollectionUpdate = (querySnapshot) => {
    const vendorProducts = [];
    querySnapshot.forEach((doc) => {
      vendorProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setData(vendorProducts);
    setLoading(false);
  };

  const onPress = async (item) => {
    const latDelta = Math.abs(
      current_location.coords.latitude - vendor.latitude,
    );
    const latFrom = current_location.coords.latitude;
    const latTo = vendor.latitude;
    const lonDelta = Math.abs(
      current_location.coords.longitude - vendor.longitude,
    );
    const distance =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(latDelta / 2), 2) +
            Math.cos(latFrom) *
              Math.cos(latTo) *
              Math.pow(Math.sin(lonDelta / 2), 2),
        ),
      ) *
      63710; // 6371000 due to Earth's radius

    if (!distance || distance > VendorAppConfig.VENDOR_DISTANCE_LIMIT) {
      alert(
        IMLocalized(
          "You're trying to add an item from a Food Artist outside the area limit. Please try Food Artist.",
        ),
      );
      return;
    } else {
      setSelectedItem(item);
      setIsVisible(true);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={
        <View style={styles.subtitleView}>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.foodInfo}>
            <Text style={styles.price}>{item.price} kr</Text>
          </View>
        </View>
      }
      onPress={() => onPress(item)}
      leftIcon={<Image style={styles.rightIcon} source={{ uri: item.photo }} />}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );
  return (
    <View style={styles.container}>
      {data.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
        onSwipeComplete={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SingleItemDetail
          close={() => setIsVisible(false)}
          vendor={vendor}
          foodItem={selectedItem}
        />
      </Modal>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

SingleVendorScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    onPress: PropTypes.func,
    cartItems: PropTypes.array,
  }),
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
});

export default connect(mapStateToProps)(SingleVendorScreen);
