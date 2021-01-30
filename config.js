import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBPQbBg9BuVh5KHTRbJ2_wLX7Dm92CHRbs",
  authDomain: "barter-system-18f97.firebaseapp.com",
  projectId: "barter-system-18f97",
  storageBucket: "barter-system-18f97.appspot.com",
  messagingSenderId: "724642674631",
  appId: "1:724642674631:web:b0cf7b86bfab88eee88be2"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
