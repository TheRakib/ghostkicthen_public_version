import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Bar } from 'react-native-progress';
import dynamicStyles from './styles';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { IMLocalized } from '../../localization/IMLocalization';
import { IMSingleOrderAPIManager } from '../api/IMSingleOrderAPIManager';
import { Appearance } from 'react-native-appearance';
import IMDeliveryView from '../IMDelivery/IMDeliveryView';
import { getDirections, getETA } from '../api/directions';
import LottieView from 'lottie-react-native';

const COLOR_SCHEME = Appearance.getColorScheme();

export default function IMOrderTrackingScreen({ navigation, route }) {
  const appStyles = route.params.appStyles;
  const styles = dynamicStyles(appStyles);

  const item = route.params.item;
  const [order, setOrder] = useState(item);
  const [eta, setEta] = useState(0);
  const [region, setRegion] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [pickUp, setPickUp] = useState(false);
  const [selfDelivery, setSelfDelivery] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');

  const { width } = Dimensions.get('screen');
  const singleOrderManager = new IMSingleOrderAPIManager(setOrder, item.id);
  const stages = [
    'Order Placed',
    'Order Shipped',
    'In Transit',
    'Order Completed',
  ];

  const computeETA = async () => {
    const preparingTime = 1800;

    if (
      (order.chosenDelivery === 'pickUp' && order.status === 'Order Placed') ||
      order.status === 'Order Pick Up Accepted' ||
      order.status === 'Order Is Ready' ||
      (order.status === 'Order Picked Up' && order.address && order.author)
    ) {
      setVendorPhone(order.vendor.phone);
      setPickUpAddress(order.vendor.address);
      setPickUp(true);
    } else if (
      (order.status === 'Order Placed' ||
        order.status === 'Order Accepted' ||
        order.status === 'Driver Pending' ||
        order.status === 'Driver Accepted' ||
        order.status === 'Driver Rejected') &&
      order.address &&
      order.author
    ) {
      const eta = await getETA(
        { latitude: order.vendor.latitude, longitude: order.vendor.longitude },
        order.address.location ? order.address.location : order.author.location,
      );
      setEta(2 * eta + preparingTime);
      return;
    } else if (
      order.status === 'Order Placed' ||
      order.status === 'Order Self Delivery Accepted' ||
      (order.products[0].delivery === 'selfDelivery' &&
        order.address &&
        order.author)
    ) {
      setSelfDelivery(true);
      const eta = await getETA(
        { latitude: order.vendor.latitude, longitude: order.vendor.longitude },
        order.address.location ? order.address.location : order.author.location,
      );
      setEta(2 * eta + preparingTime);
      return;
    } else {
      return;
    }
    if (order.driver && order.vendor && order.address) {
      if (order.status === 'Order Shipped') {
        // ETA = 2 * (driver_to_restaurant + restaurant_to_customer)
        const eta1 = await getETA(order.driver.location, {
          latitude: order.vendor.latitude,
          longitude: order.vendor.longitude,
        });
        const eta2 = await getETA(
          {
            latitude: order.vendor.latitude,
            longitude: order.vendor.longitude,
          },
          order.address.location
            ? order.address.location
            : order.author.location,
        );
        setEta(eta1 + eta2 + preparingTime);
        return;
      }
      if (order.status === 'In Transit') {
        const eta = await getETA(order.driver.location, order.address.location);
        setEta(eta);
        return;
      }
    }
    setEta(0);
  };

  const computePolylineCoordinates = () => {
    if (!order) {
      // invalid order
      return;
    }
    const driver = order.driver;
    const author = order.author;
    const vendor = order.vendor;
    const address = order.address;

    if (order.status === 'Order Shipped' && vendor && driver) {
      // Driver has been allocated, and they're driving to pick up the order from the vendor location
      const sourceCoordinate = {
        latitude: driver.location?.latitude,
        longitude: driver.location?.longitude,
      };
      const destCoordinate = {
        latitude: vendor.latitude,
        longitude: vendor.longitude,
      };
      getDirections(sourceCoordinate, destCoordinate, (coordinates) => {
        const pointOfInterests = [
          sourceCoordinate,
          ...coordinates,
          destCoordinate,
        ];
        setRouteCoordinates(coordinates);
        centerMap(pointOfInterests);
      });
      return;
    }

    if (order.status === 'In Transit' && vendor && driver) {
      // Driver has picked up the order from the vendor, and now they're delivering it to the shipping address
      const sourceCoordinate = {
        latitude: driver.location?.latitude,
        longitude: driver.location?.longitude,
      };
      const destLocation = address ? address.location : author.location;
      const destCoordinate = {
        latitude: destLocation.latitude,
        longitude: destLocation.longitude,
      };
      getDirections(sourceCoordinate, destCoordinate, (coordinates) => {
        const pointOfInterests = [
          sourceCoordinate,
          ...coordinates,
          destCoordinate,
        ];
        setRouteCoordinates(coordinates);
        centerMap(pointOfInterests);
      });
      return;
    }
  };

  const centerMap = (pointOfInterests) => {
    var maxLatitude = -400;
    var minLatitude = 400;
    var maxLongitude = -400;
    var minLongitude = 400;
    pointOfInterests.forEach((coordinate) => {
      if (maxLatitude < coordinate.latitude) maxLatitude = coordinate.latitude;
      if (minLatitude > coordinate.latitude) minLatitude = coordinate.latitude;
      if (maxLongitude < coordinate.longitude)
        maxLongitude = coordinate.longitude;
      if (minLongitude > coordinate.longitude)
        minLongitude = coordinate.longitude;
    });

    setRegion({
      latitude: (maxLatitude + minLatitude) / 2,
      longitude: (maxLongitude + minLongitude) / 2,
      latitudeDelta: Math.abs(
        (maxLatitude - (maxLatitude + minLatitude) / 2) * 4,
      ),
      longitudeDelta: Math.abs(
        (maxLongitude - (maxLongitude + minLongitude) / 2) * 4,
      ),
    });
  };

  useEffect(() => {
    computeETA();
    computePolylineCoordinates();
  }, [order?.status]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Your Order'),
      headerRight: () => <View />,
    });

    return () => {
      singleOrderManager.unsubscribe();
    };
  }, [singleOrderManager, navigation]);

  var deliveryDate = new Date();
  if (eta > 0) {
    deliveryDate.setSeconds(deliveryDate.getSeconds() + eta);
  }

  var latestArrivalDate = new Date();
  latestArrivalDate.setSeconds(latestArrivalDate.getSeconds() + eta + 20 * 60);

  const etaString =
    eta > 0
      ? (deliveryDate.getHours() < 10
        ? '0' + deliveryDate.getHours()
        : deliveryDate.getHours()) +
      ':' +
      (deliveryDate.getMinutes() < 10
        ? '0' + deliveryDate.getMinutes()
        : deliveryDate.getMinutes())
      : '';
  var latestArrivalString =
    eta > 0
      ? (latestArrivalDate.getHours() < 10
        ? '0' + latestArrivalDate.getHours()
        : latestArrivalDate.getHours()) +
      ':' +
      (latestArrivalDate.getMinutes() < 10
        ? '0' + latestArrivalDate.getMinutes()
        : latestArrivalDate.getMinutes())
      : '';

  const tempIndex = stages.indexOf(order.status);
  const stagesIndex = tempIndex === -1 ? 0 : tempIndex;

  const renderOrderSummary = (product) => {
    return (
      <View style={styles.orderPane}>
        <Text style={styles.qty}>{product.quantity}</Text>
        <Text style={styles.productItem}>{product.name}</Text>
      </View>
    );
  };

  const onPressCallVendor = () => {
    Linking.openURL(`tel:${vendorPhone}`);
  };

  return (
    <ScrollView style={styles.scroll}>
      {order.status === 'Order Placed' && (
        <>
          <View style={styles.upperPane}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {IMLocalized('Your order has been sent to ') + order.vendor.title}
            </Text>
          </View>
          <LottieView
            style={styles.cookingImage}
            source={require('../../../CoreAssets/Lotties/orderplaced.json')}
            autoPlay
            loop
          />
        </>
      )}

      {order.status === 'Order Self Delivery Accepted' ||
        order.status === 'Order Accepted' ||
        order.status === 'Driver Pending' ||
        order.status === 'Driver Accepted' ||
        order.status === 'In Transit' ||
        order.status === 'Order Shipped' ? (
          <>
            <View style={styles.upperPane}>
              <Text style={styles.time}>{etaString}</Text>
            </View>
            <Text style={styles.eta}>{IMLocalized('Estimated arrival')}</Text>

            <Bar
              progress={0.25 * (stagesIndex + 1)}
              color={appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor}
              borderWidth={0}
              width={width - 20}
              unfilledColor={appStyles.colorSet[COLOR_SCHEME].grey0}
              style={styles.bar}
            />
          </>
        ) : null}

      {order.status === 'Self Delivery On Way' && (
        <>
          <View style={styles.upperPane}>
            <Text style={styles.time}>{etaString}</Text>
          </View>
          <Text style={styles.eta}>{IMLocalized('Estimated arrival')}</Text>

          <Bar
            progress={0.8 * (order.status === 'Self Delivery On Way')}
            color={appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor}
            borderWidth={0}
            width={width - 20}
            unfilledColor={appStyles.colorSet[COLOR_SCHEME].grey0}
            style={styles.bar}
          />
        </>
      )}

      <Text style={styles.prepText}>
        {(order.products[0].delivery === 'mumsyDelivery' &&
          order.status === 'Order Accepted') ||
          order.status === 'Driver Pending'
          ? IMLocalized('Preparing your order...')
          : order.status === 'In Transit'
            ? order.driver.firstName + IMLocalized(' is heading your way')
            : order.status === 'Order Shipped'
              ? order.driver.firstName + IMLocalized(' is picking up your order')
              : ''}
        {order.products[0].delivery === 'selfDelivery' &&
          order.status === 'Order Self Delivery Accepted'
          ? IMLocalized('Preparing your order...')
          : order.status === 'Self Delivery On Way'
            ? order.vendor.authorName + IMLocalized('is heading your way')
            : ''}
      </Text>

      {order.status === 'Driver Pending' ||
        order.status === 'Driver Accepted' ||
        order.status === 'In Transit' ||
        order.status === 'Order Self Delivery Accepted' ||
        order.status === 'Order Accepted' ||
        order.status === 'Self Delivery On Way' ||
        order.status === 'Order Shipped' ? (
          <Text style={styles.eta}>
            {IMLocalized('Latest arrival by')} {latestArrivalString}
          </Text>
        ) : null}

      {order.status === 'Order Accepted' ||
        order.status === 'Driver Pending' ||
        order.status === 'Driver Accepted' ||
        order.status === 'Order Self Delivery Accepted' ? (
          <>
            <LottieView
              style={styles.cookingImage}
              source={require('../../../CoreAssets/Lotties/Preparingfood.json')}
              autoPlay
              loop
            />
          </>
        ) : null}

      {order.status === 'Self Delivery On Way' && (
        <LottieView
          style={styles.cookingImage}
          source={require('../../../CoreAssets/Lotties/selfDelivery.json')}
          autoPlay
          loop
        />
      )}

      {order.status === 'Order Completed' && (
        <>
          <View style={styles.upperPane}>
            <Text style={styles.time}>{IMLocalized('Order Delivered')}</Text>
          </View>
          <LottieView
            style={styles.cookingImage}
            source={require('../../../CoreAssets/Lotties/order-delivered.json')}
            autoPlay
            loop
          />
        </>
      )}

      {order.status == 'Order Rejected' && (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              marginTop: -20,
              marginHorizontal: 10,
            }}>
            {IMLocalized('Your order has been Rejected')}
          </Text>
          <LottieView
            style={styles.cookingImage}
            source={require('../../../CoreAssets/Lotties/order-rejected.json')}
            autoPlay
            loop={false}
          />
        </>
      )}

      {pickUp && (
        <>
          <View style={styles.upperPane}>
            {order.status === 'Order Pick Up Accepted' && (
              <>
                <Text style={styles.pickUpStatus}>
                  {IMLocalized('Preparing your order...')}
                </Text>

                <LottieView
                  style={styles.cookingImage}
                  source={require('../../../CoreAssets/Lotties/Preparingfood.json')}
                  autoPlay
                  loop
                />
              </>
            )}

            {order.status == 'Order Is Ready' && (
              <>
                <Text style={styles.pickUpStatus}>
                  {IMLocalized('Ready for pick up!')}
                </Text>
                <LottieView
                  style={styles.cookingImage}
                  source={require('../../../CoreAssets/Lotties/preparedfood.json')}
                  autoPlay
                  loop
                />
              </>
            )}
            {order.status == 'Order Picked Up' && (
              <>
                <Text style={styles.pickUpStatus}>
                  {IMLocalized('Order Picked Up')}
                </Text>
                <LottieView
                  style={styles.cookingImage}
                  source={require('../../../CoreAssets/Lotties/pickup-food.json')}
                  autoPlay
                  loop
                />
              </>
            )}

            {order.status == 'Order Picked Up' && (
              <>
                <View
                  style={{
                    paddingTop: 30,
                  }}>
                  <View>
                    <Text style={styles.thankYou}>
                      Tack för din beställning {order.author.firstName}, Smaklig
                      måltid!
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
          <View style={([styles.container, styles.overlay], { marginTop: 50 })}>
            {(pickUp && order.status === 'Order Placed') ||
              order.status === 'Order Rejected' ||
              order.status == 'Order Picked Up' ? null : (
                <>
                  <Text style={styles.sectionTitle}>
                    {IMLocalized('Pick Up Details')}
                  </Text>
                  <Text style={styles.subMainTitle}>
                    {IMLocalized('Address')}
                  </Text>
                  <Text style={styles.subText}>{pickUpAddress}</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onPressCallVendor}
                    style={styles.callVendorBtn}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      {IMLocalized('Call Food Artist')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                  <Text style={styles.subMainTitle}>{IMLocalized('Type')}</Text>
                  <Text style={styles.subText}>
                    {IMLocalized('Pick up your order')}
                  </Text>
                </>
              )}
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>
              {IMLocalized('Order Summary')}
            </Text>

            <View style={styles.horizontalPane}>
              <Text style={styles.vendorTitle}>
                {order.vendor && order.vendor.title}
              </Text>
              <Text style={styles.receipts}>
                {IMLocalized('View Receipts')}
              </Text>
            </View>
            {order.products.map((product) => renderOrderSummary(product))}
            <View style={styles.horizontalPane}>
              <Text style={styles.totalText}>{IMLocalized('Total')}</Text>
              <Text style={styles.totalPrice}>
                {order.products
                  .reduce((prev, next) => prev + next.price * next.quantity, 0)
                  .toFixed(2)}{' '}
                Kr
              </Text>
            </View>
            <View style={styles.divider} />
          </View>
        </>
      )}
      <View style={styles.container}>
        {region &&
          (order.status === 'In Transit' ||
            order.status === 'Order Shipped') && (
            <MapView
              initialRegion={region}
              provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
              showsUserLocation={true}
              style={styles.mapStyle}>
              <Polyline coordinates={routeCoordinates} strokeWidth={5} />
              {order.driver !== undefined && (
                <Marker
                  title={order.driver.firstName}
                  coordinate={{
                    latitude: order.driver.location.latitude,
                    longitude: order.driver.location.longitude,
                  }}
                  style={styles.marker}>
                  <Image
                    source={require('../assets/car-icon.png')}
                    style={styles.mapCarIcon}
                  />
                  <Text style={styles.markerTitle}>
                    {order.driver.firstName}
                  </Text>
                </Marker>
              )}
              {order.status === 'Order Shipped' && order.vendor && (
                <Marker
                  title={order.vendor.title}
                  coordinate={{
                    latitude: order.vendor.latitude,
                    longitude: order.vendor.longitude,
                  }}
                  style={styles.marker}>
                  <Image
                    source={require('../assets/destination-icon.png')}
                    style={styles.mapCarIcon}
                  />
                  <Text style={styles.markerTitle}>{order.vendor.title}</Text>
                </Marker>
              )}

              {order.status === 'In Transit' && order.address && (
                <Marker
                  title={`${order.address?.line1} ${order.address?.line2}`}
                  coordinate={{
                    latitude: order.address.location
                      ? order.address.location.latitude
                      : order.author.location.latitude,
                    longitude: order.address.location
                      ? order.address.location.longitude
                      : order.author.location.longitude,
                  }}
                  style={styles.marker}>
                  <Image
                    source={require('../assets/destination-icon.png')}
                    style={styles.mapCarIcon}
                  />
                  <Text style={styles.markerTitle}>{order.vendor.title}</Text>
                </Marker>
              )}
            </MapView>
          )}
        {((!pickUp &&
          order?.status != 'In Transit' &&
          order?.status != 'Order Shipped') ||
          (region &&
            (order?.status == 'In Transit' ||
              order?.status == 'Order Shipped'))) && (
            <IMDeliveryView
              navigation={navigation}
              order={order}
              appStyles={appStyles}
            />
          )}
      </View>
    </ScrollView>
  );
}
