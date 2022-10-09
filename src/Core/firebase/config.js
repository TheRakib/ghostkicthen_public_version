import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDiVsmyR_c58Lz7qoC3D3j4_f0WFKweAw',
  authDomain: 'mumsyfoodlover.firebaseapp.com',
  projectId: 'mumsyfoodlover',
  storageBucket: 'mumsyfoodlover.appspot.com',
  messagingSenderId: '598310464243',
  appId: '1:598310464243:web:02efdae3fc5f0eea376586',
  measurementId: 'G-7R932G20NN',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
