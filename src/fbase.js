import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEQWW5l0un9Kv_NfGFWx29Ba2dm2pY6_0',
  authDomain: 'twitter-firebase-8acd7.firebaseapp.com',
  projectId: 'twitter-firebase-8acd7',
  storageBucket: 'twitter-firebase-8acd7.appspot.com',
  messagingSenderId: '572448809124',
  appId: '1:572448809124:web:8d6d653329ecf74b484631',
  measurementId: 'G-1PVGP3B64M',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
