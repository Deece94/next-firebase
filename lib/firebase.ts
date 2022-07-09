import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDijSNViw4N6Lg5GwXCb560Yfaj1kmwo4c",
  authDomain: "next-firebase-62cb3.firebaseapp.com",
  projectId: "next-firebase-62cb3",
  storageBucket: "next-firebase-62cb3.appspot.com",
  messagingSenderId: "782100009050",
  appId: "1:782100009050:web:8488f5ed511fe4a590c863",
  measurementId: "G-L8PSRW0JC7",
};

let app = null;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();

export const firestore: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
