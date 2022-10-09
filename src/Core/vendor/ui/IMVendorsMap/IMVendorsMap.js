import React, { useState, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';
import MAP_STYLE from '../../../../MapStyle';
import { IMLocalized } from '../../../localization/IMLocalization';

function IMVendorMapScreen({ navigation }) {
  const vendors = useSelector((state) => state.vendor.vendors);
  const currentUser = useSelector((state) => state.auth.user);

  const [region, setRegion] = useState({
    latitude: currentUser.location?.latitude,
    longitude: currentUser.location?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [currentPosBtn, setCurrentPosBtn] = useState({ marginBottom: 1 });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: IMLocalized('Food Artists'),
      headerRight: () => <Text />,
    });
    setMarkers(vendors);
  }, [vendors]);

  const onPressMarkerItem = (item) => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        region={region}
        style={[styles.map, currentPosBtn]}
        onMapReady={() => {
          setCurrentPosBtn({ marginBottom: 0 });
        }}>
        {markers?.length > 0 &&
          markers.map((marker) => (
            <Marker
              onPress={() => onPressMarkerItem(marker)}
              coordinate={{
                latitude: marker.latitude || 0,
                longitude: marker.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title={marker.title}
            />
          ))}
      </MapView>
    </View>
  );
}

export default IMVendorMapScreen;
