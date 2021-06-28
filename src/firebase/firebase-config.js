import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-bzwpDVmyvmQ8N5T6MiOwg8uvJSSOnAg",
    authDomain: "journal-app-3de67.firebaseapp.com",
    projectId: "journal-app-3de67",
    storageBucket: "journal-app-3de67.appspot.com",
    messagingSenderId: "916148077782",
    appId: "1:916148077782:web:5dae7be3f69ce18e543577"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //data base
  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }