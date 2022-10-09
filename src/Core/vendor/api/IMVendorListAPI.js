import { firebase } from '../../firebase/config';

export default class IMVendorListAPI {
  constructor(callback, table, updateLoadingStateCallback) {
    this.callback = callback;
    this.table = table;
    this.updateLoadingStateCallback = updateLoadingStateCallback;
    this.noOfVendors = 0; // determines no of vendor data to fetch initally
    this.noOfVendorsInterval = 10; // no of additional vendors to fetch subsequently

    this.vendorsRef = firebase.firestore().collection(table);
    this.fetchVendors();
  }

  unsubscribe() {
    this.vendorsUnsubscribe();
  }

  fetchVendors = async () => {
    if (this.vendorsUnsubscribe) {
      this.vendorsUnsubscribe();
    }

    this.noOfVendors += this.noOfVendorsInterval;
    this.vendorsUnsubscribe = this.vendorsRef
      .limit(this.noOfVendors)
      .onSnapshot(this.onVendorsCollectionUpdate);
  };

  onVendorsCollectionUpdate = (querySnapshot) => {
    const vendors = [];
    querySnapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    this.callback(vendors);

    if (vendors.length < this.noOfVendors) {
      this.updateLoadingStateCallback(false);
    }
  };
}
