import axios from 'axios';

export default class PaymentRequestAPI {
  constructor(appConfig) {
    this.appConfig = appConfig;
  }

  postRequest = async (endPoint, body) => {
    const apiConnector = axios.create(this.appConfig.stripeEnv.API);
    try {
      const response = await apiConnector.post(endPoint, body);

      return { ...response, success: true };
    } catch (error) {
      const stripeError = error.response ? error.response : error;
      console.log('stripeError: ', stripeError);
      return { stripeError, success: false };
    }
  };

  createStripeCustomer = (email) => {
    const endPoint = '/create-stripe-customer';
    const body = {
      email,
    };

    return this.postRequest(endPoint, body);
  };

  getStripeCustomerID = async (email) => {
    const stripeCustomer = await this.createStripeCustomer(email);

    if (stripeCustomer.success && stripeCustomer?.data?.customer?.id) {
      return stripeCustomer.data.customer.id;
    }

    return false;
  };

  addNewPaymentSource = async (customerId, token) => {
    const endPoint = '/add-payment-source';
    const body = {
      customerId: customerId,
      token,
    };

    return this.postRequest(endPoint, body);
  };

  attachPaymentMethod = async (paymentMethodId, customerId) => {
    const endPoint = '/attach-payment-method';
    const body = {
      paymentMethodId: paymentMethodId,
      customerId: customerId,
    };

    return this.postRequest(endPoint, body);
  };

  detachPaymentMethod = async (paymentMethodId) => {
    const endPoint = '/detach-payment-method';
    const body = {
      paymentMethodId: paymentMethodId,
    };

    return this.postRequest(endPoint, body);
  };

  getPaymentMethods = async (customerId) => {
    const endPoint = '/get-customer-payment-methods';
    const body = {
      customerId: customerId,
    };

    return this.postRequest(endPoint, body);
  };

  chargeStripeCustomer = async ({
    customer,
    currency,
    amount,
    source,
    uuid,
  }) => {
    const endPoint = '/charge-stripe-customer';

    const body = {
      customer,
      currency,
      amount,
      source,
      uuid,
    };

    return this.postRequest(endPoint, body);
  };

  createPaymentIntent = async ({ customerId, paymentMethodId, amount }) => {
    const endPoint = '/create-payment-intent';

    const body = {
      customerId,
      paymentMethodId,
      amount,
    };

    return this.postRequest(endPoint, body);
  };

  confirmPaymentIntent = async ({ id }) => {
    const endPoint = '/confirm-payment-intent';

    const body = {
      id,
    };

    return this.postRequest(endPoint, body);
  };

  getCustomerPaymentMethods = async ({ customerId }) => {
    const endPoint = '/get-customer-payment-methods';

    const body = {
      customerId,
    };

    return this.postRequest(endPoint, body);
  };

  deletePaymentSource = (customerId, token) => {
    const endPoint = '/delete-payment-source';
    const body = {
      customerId,
      token,
    };

    return this.postRequest(endPoint, body);
  };

  cleanCustomerStripeAccount = (customer) => {
    const endPoint = '/clean-customer-stripe-account';
    const body = {
      customer,
    };

    return this.postRequest(endPoint, body);
  };
}
