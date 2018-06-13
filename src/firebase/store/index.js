// Firebase App is always required and must be first
import firebase from 'firebase/app';
// Add additional services you want to use
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/messaging';
// import 'firebase/storage';
// import 'firebase/functions';

import Balls from './balls';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'amazeballs-dd1c9.firebaseapp.com',
    databaseURL: 'https://amazeballs-dd1c9.firebaseio.com',
    projectId: 'amazeballs-dd1c9',
    storageBucket: 'amazeballs-dd1c9.appspot.com',
    messagingSenderId: process.env.FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
    console.log('Logged in as:', user);
    store.currentUser = user;
  });

const getCollection = (name) => firebase.firestore().collection(name);

const balls = new Balls(getCollection('balls'));

export const store = {
    currentUser: null,
    writeBall(message) {
        balls.write({ message, user: this.currentUser});
    },
    balls: balls.balls
};

export default store;

