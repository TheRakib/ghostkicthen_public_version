import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../../DynamicAppStyles';
import styles from './styles';
import { useSelector } from 'react-redux';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../../Core/truly-native';
import { VendorProductsAPIManager } from '../../api/vendorAPIProduct';
import Hamburger from '../../../components/Hamburger/Hamburger';
import { AddProductView } from '../../components/AddProduct/AddProductView';
import VendorAppConfig from '../../VendorAppConfig';
import ActionSheet from 'react-native-actionsheet';

function ProductListScreen(props) {
  const { navigation } = props;

  const currentUser = useSelector((state) => state.auth.user);

  const emptyStateConfig = {
    title: IMLocalized('No Products'),
    description: IMLocalized(
      'There are currently no products. Your products will show up here once you add them.',
    ),
  };

  const [products, setProducts] = useState([]);
  const [refreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [delivery, setDelivery] = useState('');

  const actionsheetRef = useRef(null);

  const onProductsReceived = (products) => {
    setProducts(products);
    setLoading(false);
  };

  const showActionSheet = async (index) => {
    actionsheetRef.current.show();
  };

  const vendorProductsApiManager = useRef(
    new VendorProductsAPIManager(onProductsReceived),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Your Products'),
      headerRight: () => (
        <TouchableOpacity onPress={onOpenModal}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/icons/mumsy-create.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      ),
    });
  }, [navigation]);

  const onCategoriesReceived = (categories) => {
    setCategories(categories);
  };

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
    vendorProductsApiManager.current &&
      vendorProductsApiManager.current.unsubscribe();

    vendorProductsApiManager.current &&
      vendorProductsApiManager.current.subscribe(currentUser);

    if (VendorAppConfig.isMultiVendorEnabled) {
      vendorProductsApiManager.current &&
        vendorProductsApiManager.current.subscribeCategories(
          onCategoriesReceived,
        );
    }
  }, currentUser?.id);

  const onOpenModal = () => {
    setSelectedProduct(null);
    setItemToDelete(null);
    setIsVisible(true);
  };

  const addProduct = (product) => {
    vendorProductsApiManager.current.onAddProduct({
      vendorID: currentUser.vendorID,
      ...product,
    });
  };

  const updateProduct = (product) => {
    vendorProductsApiManager.current.onUpdate(product);
  };

  const onDeleteProduct = () => {
    if (itemToDelete) {
      vendorProductsApiManager.current.onDelete(itemToDelete.id, () =>
        setItemToDelete(null),
      );
    }
  };

  const onCancel = () => {
    setIsVisible(false);
    setSelectedProduct(null);
    setItemToDelete(null);
  };

  const onPress = (product) => {
    setSelectedProduct(product);
  };

  const renderProduct = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={
        <>
          <View style={styles.subtitleView}>
            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>

            {item.delivery === 'selfDelivery' ? (
              <View style={styles.foodInfo}>
                <Text style={styles.item}>{IMLocalized('Self Delivery')}</Text>
                <Text style={styles.price}>{item.price} kr</Text>
              </View>
            ) : null}

            {item.delivery === 'mumsyDelivery' ? (
              <View style={styles.foodInfo}>
                <Text style={styles.item}>{IMLocalized('Mumsy Delivery')}</Text>
                <Text style={styles.price}>{item.price} kr</Text>
              </View>
            ) : null}
          </View>
        </>
      }
      onPress={() => onPress(item)}
      onLongPress={() => {
        setItemToDelete(item);
        showActionSheet();
      }}
      leftIcon={<Image style={styles.rightIcon} source={{ uri: item.photo }} />}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );
  return (
    <View style={styles.container}>
      {products.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      {(isVisible || selectedProduct) && (
        <AddProductView
          onCancel={onCancel}
          categoryData={categories}
          addProduct={addProduct}
          initialProduct={selectedProduct}
          onUpdate={updateProduct}
          delivery={delivery}
        />
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />

      <ActionSheet
        ref={actionsheetRef}
        title={`Are you sure you want to remove ${itemToDelete?.name}?`}
        options={[
          IMLocalized('Remove Product'),
          IMLocalized('Cancel'),
          IMLocalized('Edit Product'),
        ]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => {
          if (index == 0) {
            onDeleteProduct();
            return;
          }
          if (index == 2) {
            setSelectedProduct(itemToDelete);
          }
        }}
      />
    </View>
  );
}

ProductListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default ProductListScreen;
