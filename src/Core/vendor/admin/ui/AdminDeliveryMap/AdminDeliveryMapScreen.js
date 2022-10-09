import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DeliverIcon from '../../../../../../assets/icons/deliver.png';
import styles from './styles';
import MAP_STYLE from '../../../../../MapStyle';
import { AdminDeliveryMapAPI } from '../../api/AdminDeliveryMapAPI';

export default function AdminDeliveryMapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const orders = new AdminDeliveryMapAPI(setMarkers);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Delivery',
      headerTitle: 'MapScreen',
      headerRight: () => <Text />,
    });
  }, [navigation]);

  useEffect(() => {
    return () => {
      orders.unsubscribe();
    };
  }, [orders]);

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.map} customMapStyle={MAP_STYLE}>
        {markers.map((marker) => (
          <Marker
            coordinate={{
              latitude: marker.data.location.lat,
              longitude: marker.data.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            image={DeliverIcon}
            title={'Delivery of your burger king'}
          />
        ))}
      </MapView>
    </View>
  );
}
