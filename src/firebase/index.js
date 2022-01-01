import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNEk5EmPbQiPP1eTaVAF3Kj7b02B8c1z4",
    authDomain: "fir-react-upload-271bb.firebaseapp.com",
    projectId: "fir-react-upload-271bb",
    storageBucket: "fir-react-upload-271bb.appspot.com",
    messagingSenderId: "375950288827",
    appId: "1:375950288827:web:73ab154e676f98501c869e",
    measurementId: "G-GWYCMHG0JJ"
  };

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

export { storage, firebase as default };