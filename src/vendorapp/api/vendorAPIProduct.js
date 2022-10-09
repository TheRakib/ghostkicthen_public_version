import VendorAppConfig from '../VendorAppConfig';
import { firebase } from '../../Core/firebase/config';

export class VendorProductsAPIManager {
  constructor(onProductsReceivedCallback = console.log) {
    this.onProductsReceivedCallback = onProductsReceivedCallback;
  }

  subscribe = (viewer) => {
    // The current user (viewer) is the admin of a vendor, so they can manage all the products
    if (!viewer?.vendorID) {
      return null;
    }
    this.ref = firebase
      .firestore()
      .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
      .where('vendorID', '==', viewer.vendorID);

    this.unsubscribeSnapshot = this.ref.onSnapshot(
      this.onCollectionUpdate,
      (error) => {
        console.log(error);
      },
    );
  };

  subscribeCategories = (onCategoriesCallback = console.log) => {
    this.onCategoriesCallback = onCategoriesCallback;
    this.categoriesRef = firebase
      .firestore()
      .collection(VendorAppConfig.tables.VENDOR_CATEGORIES);

    this.unsubscribeCategoriesSnapshot = this.categoriesRef.onSnapshot(
      this.onCategoriesCollectionUpdate,
      (error) => {
        console.log(error);
      },
    );
  };

  unsubscribe = () => {
    this.unsubscribeSnapshot && this.unsubscribeSnapshot();
    this.unsubscribeCategoriesSnapshot && this.unsubscribeCategoriesSnapshot();
  };

  onUpdate = async (product) => {
    if (!product?.id) {
      return null;
    }
    return firebase
      .firestore()
      .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
      .doc(product.id)
      .update(product);
  };

  onDelete = async (productID, callback) => {
    firebase
      .firestore()
      .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
      .doc(productID)
      .delete()
      .then((result) => {
        callback();
        console.warn(result);
      })
      .catch((error) => {
        callback();
        console.warn(error);
      });
  };

  onAddProduct = async (product) => {
    const productsRef = firebase
      .firestore()
      .collection(VendorAppConfig.tables.VENDOR_PRODUCTS);

    const ref = await productsRef.add(product);
    await productsRef.doc(ref.id).update({ id: ref.id });
  };

  onCategoriesCollectionUpdate = (querySnapshot) => {
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        key: doc.id,
        label: doc.data().title,
        ...doc.data(),
      });
    });
    this.onCategoriesCallback && this.onCategoriesCallback(categories);
  };

  onCollectionUpdate = (querySnapshot) => {
    const vendorProducts = [];
    querySnapshot.forEach((doc) => {
      vendorProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    this.onProductsReceivedCallback &&
      this.onProductsReceivedCallback(vendorProducts);
  };
}