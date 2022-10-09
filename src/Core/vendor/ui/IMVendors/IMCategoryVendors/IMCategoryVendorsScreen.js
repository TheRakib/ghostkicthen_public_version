import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IMLocalized } from '../../../../localization/IMLocalization';
import IMVendorsScreen from '../IMVendorsScreen';

export function IMCategoryVendorsScreen({ route, navigation }) {
  const category = route?.params?.category;
  const appStyles = route?.params?.appStyles;
  const appConfig = route?.params?.appConfig;
  const vendors = useSelector((state) => state.vendor.vendors);
  const [foods, setVendors] = useState([]);

  useEffect(() => {
    let vendorCategoryList = vendors.filter(
      (vendorItem) => vendorItem.categoryID === category?.id,
    );
    setVendors(vendorCategoryList);
  }, [category, vendors]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.category
        ? `${route?.params?.category.title}`
        : IMLocalized('Home'),
      headerRight: () => <View />,
    });
  }, []);

  return (
    <IMVendorsScreen
      navigation={navigation}
      appConfig={appConfig}
      appStyles={appStyles}
      vendors={foods}
    />
  );
}