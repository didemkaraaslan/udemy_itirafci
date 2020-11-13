import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBtoiA57MsklUKpxcXU740B7sX7kW22d68',
  authDomain: 'itirafci-91101.firebaseapp.com',
  databaseURL: 'https://itirafci-91101.firebaseio.com',
  projectId: 'itirafci-91101',
  storageBucket: 'itirafci-91101.appspot.com',
  messagingSenderId: '955699753876',
  appId: '1:955699753876:web:bb66d534922ae9d29e9581',
  measurementId: 'G-XH4YYJ391G',
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
