import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD20dvyabzSxJ-PXUBidtTwFYaJQp009m4',
  authDomain: 'fb-messenger-d026a.firebaseapp.com',
  projectId: 'fb-messenger-d026a',
  storageBucket: 'fb-messenger-d026a.appspot.com',
  messagingSenderId: '368435113080',
  appId: '1:368435113080:web:3ed46abe57541c6242d18d',
  measurementId: 'G-GYF75F8CQ1',
});

const db = firebaseApp.firestore();

export {db};
