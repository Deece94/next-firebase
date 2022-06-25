import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/copmpat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDijSNViw4N6Lg5GwXCb560Yfaj1kmwo4c",
  authDomain: "next-firebase-62cb3.firebaseapp.com",
  projectId: "next-firebase-62cb3",
  storageBucket: "next-firebase-62cb3.appspot.com",
  messagingSenderId: "782100009050",
  appId: "1:782100009050:web:8488f5ed511fe4a590c863",
  measurementId: "G-L8PSRW0JC7"
};


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
