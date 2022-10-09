import { firebase } from '../../firebase/config';
import PaymentRequestAPI from '../../payment/api/index';
import uuid from 'uuidv4';
export default class CartAPIManager {
  constructor(appConfig) {
    this.ref = firebase.firestore().collection('restaurant_orders');
    this.appConfig = appConfig;
    this.paymentRequestAPI = new PaymentRequestAPI(this.appConfig);
  }

  async chargeCustomer({ customer, currency, amount, source }) {
    const stripeResponse = await this.paymentRequestAPI.chargeStripeCustomer({
      customer,
      currency,
      amount,
      source,
      uuid: uuid(),
    });
    return stripeResponse;
  }

  placeOrder(
    cartItems,
    user,
    shippingAddress,
    vendor,
    deliveryOption,
    callback,
  ) {
    var products = [];
    cartItems.forEach((item) => {
      const { name, photo, price, quantity, delivery } = item;
      products.push({
        id: item.id,
        name,
        quantity,
        photo,
        price,
        delivery,
      });
    });

    const order = {
      authorID: user.id,
      author: user,
      products,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      vendorID: vendor.id,
      vendor: vendor,
      status: 'Order Placed',
      address: shippingAddress,
      chosenDelivery: deliveryOption,
    };

    this.ref
      .add(order)
      .then((response) => {
        const finalOrder = { ...order, id: response.id };
        this.ref.doc(response.id).update(finalOrder);
        callback && callback();
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }

  async createPaymentIntent({ customerId, paymentMethodId, amount }) {
    const stripeResponse = await this.paymentRequestAPI.createPaymentIntent({
      customerId,
      paymentMethodId,
      amount,
    });
    return stripeResponse;
  }

  async confirmPaymentIntent({ id }) {
    const stripeResponse = await this.paymentRequestAPI.confirmPaymentIntent({
      id
    });
    return stripeResponse;
  }

  async getCustomerPaymentMethods({ customerId }) {
    const stripeResponse = await this.paymentRequestAPI.getCustomerPaymentMethods({
      customerId
    });
    return stripeResponse;
  }
}
