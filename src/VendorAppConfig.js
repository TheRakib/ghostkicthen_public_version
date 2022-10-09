import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';
import DynamicAppStyles from './DynamicAppStyles';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const VendorAppConfig = {
  isMultiVendorEnabled: true,
  isSMSAuthEnabled: true,
  appIdentifier: 'mumsy.life.foodloverapp',

  isDelayedLoginEnabled: false,
  tables: {
    VENDOR: 'vendors',
    VENDOR_ORDERS: 'restaurant_orders',
    VENDOR_DELIVERIES: 'restaurant_deliveries',
    VENDOR_REVIEWS: 'vendor_reviews',
    VENDOR_PRODUCTS: 'vendor_products',
    RESERVATIONS: 'reservations',
  },
  onboardingConfig: {
    welcomeTitle: IMLocalized('Welcome To Mumsy'),
    welcomeCaption: IMLocalized(
      'Experience the missing feeling of home cooked food and taste food from around the world',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/icons/homecooking.png'),
        title: IMLocalized('Welcome To Mumsy'),
        description: IMLocalized(
          'Log in and order delicious food from Food Artist around you.',
        ),
      },
      {
        icon: require('../assets/icons/order-food.png'),
        title: IMLocalized('Order easily'),
        description: IMLocalized(
          "Hungry? Order food in just a few clicks and we'll take care of you..",
        ),
      },
      {
        icon: require('../assets/icons/delivery-man.png'),
        title: IMLocalized('Efficient delivery'),
        description: IMLocalized(
          'You can have the food delivered within 60 minutes or you pick the food yourself, smart huh!',
        ),
      },
      {
        icon: require('../assets/icons/payment.png'),
        title: IMLocalized('Pay easily'),
        description: IMLocalized(
          'Pay with your credit cards, Apple Pay or Android Pay, with one click.',
        ),
      },
    ],
  },
  drawerMenuConfig: {
    adminDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('HOME'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Restaurants',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'AdminOrder',
        },
        {
          title: IMLocalized('DELIVERY'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'Map',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('LOG OUT'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('Home'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('Categories'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('Search'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('Cart'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        /* {
          title: IMLocalized('Reservering'),
          icon: DynamicAppStyles.iconSet.reserve,
          navigationPath: 'ReservationHistoryScreen',
        }, */
        {
          title: IMLocalized('Settings'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('Orders'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('Log out'),
          icon: DynamicAppStyles.iconSet.shutdown,
          navigationPath: 'BecomeFoodArtist',
        },
      ],
    },
    customerDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('HOME'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Restaurants',
        },
        {
          title: IMLocalized('CUISINES'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('SEARCH'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('CART'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('Log out'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawer: {
      upperMenu: [
        {
          title: IMLocalized('Manage Orders'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('Manage Products'),
          icon: DynamicAppStyles.iconSet.foods,
          navigationPath: 'Products',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('Log out'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    driverDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('Home'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('Orders'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('Log out'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
  },

  editProfileFields: {
    sections: [
      {
        title: IMLocalized('Generally'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('Contact Information'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            regex: regexForEmail,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
      {
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('SECURITY'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            ...(Platform.OS === 'ios'
              ? {
                  displayName: IMLocalized('Enable Face ID / Touch ID'),
                  type: 'switch',
                  editable: true,
                  key: 'face_id_enabled',
                  value: false,
                }
              : {}),
          },
        ],
      },
      {
        title: IMLocalized('PUSH NOTIFICATIONS'),
        fields: [
          {
            displayName: IMLocalized('Order updates'),
            type: 'switch',
            editable: true,
            key: 'order_updates',
            value: false,
          },
          {
            displayName: IMLocalized('New arrivals'),
            type: 'switch',
            editable: false,
            key: 'new_arrivals',
            value: false,
          },
          {
            displayName: IMLocalized('Promotions'),
            type: 'switch',
            editable: false,
            key: 'promotions',
            value: false,
          },
        ],
      },
      {
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'contacus',
            value: 'Mumsy!',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'hejsan@mumsy.life',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504859694',
  APIs: {
    firebase: 'firebase',
  },
  API_TO_USE: 'firebase', // "firebase", "wooCommerce", "shopify",
  stripeEnv: {
    API: {
      baseURL: 'https://mumsypayment.herokuapp.com/', //your copied heroku link
      timeout: 30000,
    },
  },
  STRIPE_CONFIG: {
    PUBLISHABLE_KEY:
      'pk_test_51I6KngJOD7McUF4TQgjnrRu4HBkSwuq7vwskNqDlzrtztqjaagUBwtbM4B3076eWY0qy5LIxQ62o2Vc6bibs3y9200WMplHKQz', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: 'Your_merchant_id_goes_here',
    ANDROID_PAYMENT_MODE: 'test', // test || production
  },
  GOOGLE_SIGNIN_CONFIG: {
    SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
    WEB_CLIENT_ID:
      '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
    OFFLINE_ACCESS: true,
  },
  FIREBASE_COLLECTIONS: {
    USERS: 'users',
    PAYMENT_METHODS: 'payment_methods',
    STRIPE_CUSTOMERS: 'stripe_customers',
    CATEGORIES: 'vendor_categories',
    CHARGES: 'charges',
    ORDERS: 'restaurant_orders',
    VENDORS: 'vendors',
    SOURCES: 'sources',
    PRODUCTS: 'vendor_products',
    SHIPPING_METHODS: 'shipping_methods',
  },
  VENDOR_DISTANCE_LIMIT: 10000,
};

export default VendorAppConfig;
