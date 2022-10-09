import { VENDOR_ORDERS, VENDOR } from '../../Configuration';
import { firebase } from '../../Core/firebase/config';

export class VendorOrderAPIManager {
  constructor(callback = console.log) {
    this.callback = callback;
  }

  subscribe = (viewer) => {
    // The current user (viewer) is the admin of a vendor, so they can manage all the orders placed for that vendor
    this.ref = firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .where('vendorID', '==', viewer.vendorID)
      .orderBy('createdAt', 'desc');

    this.unsubscribeSnapshot = this.ref.onSnapshot(
      this.onCollectionUpdate,
      (error) => {
        console.log(error);
      },
    );
  };

  unsubscribe = () => {
    this.unsubscribeSnapshot && this.unsubscribeSnapshot();
  };

  accept = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Accepted' });
  };

  pickUpAccept = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Pick Up Accepted' });
  };

  selfDeliveryAccept = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Self Delivery Accepted' });
  };

  foodReady = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Is Ready' });
  };

  readyToDeliver = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Self Delivery On Way' });
  };

  completeDelivery = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Completed' });
  };

  PickedUpOrder = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Picked Up' });
  };

  reject = async (order) => {
    return firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: 'Order Rejected' });
  };

  onDelete = (orderID) => {
    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(orderID)
      .delete()
      .then((result) => console.warn(result));
  };

  onCollectionUpdate = (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      orders.push({
        id: doc.id,
        ...order,
      });
    });
    this.callback && this.callback(orders);
  };
}
