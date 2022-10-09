import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import AdminVendorAPIManager from '../../api/AdminVendorAPIManager';
import AdminAddVendorModal from '../AdminAddVendor/AdminAddVendorModal';
import dynamicStyles from './styles';
import Hamburger from '../../../../../components/Hamburger/Hamburger';
import { IMLocalized } from '../../../../localization/IMLocalization';

export default function AdminVendorListScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const appStyles = route?.params.appStyles;
  const styles = dynamicStyles(appStyles);
  useEffect(() => {
    const apiManager = new AdminVendorAPIManager(setData);
    return () => {
      apiManager.unsubscribe();
    };
  }, [1]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: IMLocalized('Food Artist'),
      headerRight: () => <Text>{''}</Text>,
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  });

  const renderVendors = (item) => {
    return (
      <View>
        <Text style={styles.mainText}>{item.data.name}</Text>
        <Text style={styles.subText}>{item.data.description}</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AdminAddVendorModal
        isVisible={isVisible}
        close={() => setVisible(false)}
      />
      <FlatList data={data} renderItem={({ item }) => renderVendors(item)} />
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.button}>Add new</Text>
      </TouchableOpacity>
    </View>
  );
}
