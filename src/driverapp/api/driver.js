import {firebase} from '../../Core/firebase/config';
import {VENDOR_ORDERS} from '../../Configuration';
import AppConfig from '../../VendorAppConfig';

export class DriverAPIManager {
  constructor(callback = console.log, orderUpdatesCallback = console.log) {
    this.callback = callback;
    this.orderUpdatesCallback = orderUpdatesCallback
  }

  subscribeToDriverDataUpdates = (driver) => {
    if (!driver || !driver.id || driver.id.length == 0) {
      return
    }
    // We're listening to the incoming requests for orders
    this.ref = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(driver.id)

    this.unsubscribeSnapshot = this.ref.onSnapshot(this.onDriverUserDataUpdate, error => {
      console.log(error);
    });
  }

  subscribeToOrder = (orderID) => {
    if (!orderID || orderID.length == 0) {
      return
    }

    this.unsubscribeOrder = firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(orderID)
      .onSnapshot(this.onOrderDataUpdate, error => {
        console.log(error);
      });
  }

  goOnline = async (driver) => {
    if (!driver || !driver.id || driver.id.length == 0) {
      return
    }
    this.ref = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(driver.id)
      .update({isActive: true})
  }

  goOffline = async (driver) => {
    if (!driver || !driver.id || driver.id.length == 0) {
      return
    }
    this.ref = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(driver.id)
      .update({isActive: false})
  }

  unsubscribe = () => {
    this.unsubscribeSnapshot && this.unsubscribeSnapshot()
    this.unsubscribeOrder && this.unsubscribeOrder()
  }

  accept = async (order, driver) => {
    if (!driver || !driver.id || driver.id.length == 0) {
      return
    }
    if (!order || !order.id || order.id.length == 0) {
      return
    }
    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({
        status: "Driver Accepted",
        driver,
        driverID: driver.id,
      });
  
    firebase
        .firestore()
        .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
        .doc(driver.id)
        .update({
          orderRequestData: null,
          inProgressOrderID: order.id
        })
  }

  reject = async (order, driver) => {
    var rejectedByDrivers = (order.rejectedByDrivers ? order.rejectedByDrivers : [])
    rejectedByDrivers.push(driver.id)
        
    firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(driver.id)
      .update({orderRequestData: null})

    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({ status: "Driver Rejected", rejectedByDrivers });
  }

  onDelete = orderID => {
    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(orderID)
      .delete()
      .then(result => console.warn(result));
  };

  markAsPickedUp = async (order) => {
    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({status: "In Transit"})
  }

  markAsCompleted = async (order, driver) => {
    firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .doc(order.id)
      .update({status: "Order Completed"})

    firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(driver.id)
      .update({inProgressOrderID: null, orderRequestData: null})
  }

  onDriverUserDataUpdate = querySnapshot => {
    const docs = querySnapshot.docs;
    if (docs?.length > 0) {
      const data = docs[0].data();
      if (data.id) {
        this.callback && this.callback(data);
      }
    } else {
      const data = querySnapshot.data()
      if (data.id) {
        this.callback && this.callback(data);
      }
    }
  };

  onOrderDataUpdate = querySnapshot => {
    const docs = querySnapshot.docs;
    if (docs?.length > 0) {
      this.orderUpdatesCallback && this.orderUpdatesCallback(docs[0].data());
    } else {
      this.orderUpdatesCallback && this.orderUpdatesCallback(querySnapshot.data());
    }
  }
}
