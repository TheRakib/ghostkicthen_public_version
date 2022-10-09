import { VENDOR_ORDERS } from '../../../Configuration';
import { firebase } from '../../firebase/config';

export class IMSingleOrderAPIManager {
  constructor(setMarkers, refId) {
    this.updateMarkers = setMarkers;
    this.ref = firebase.firestore().collection(VENDOR_ORDERS).doc(refId);
    this.data = [];

    this.subscribe();
  }

  subscribe() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate, (error) => {
      console.log(error);
    });
  }

  onCollectionUpdate = (doc) => {
    this.data.length = 0;
    let singleOrder = doc.data();
    this.updateMarkers(singleOrder);
  };

  unsubscribe = () => {
    this.unsubscribe();
  };
}
