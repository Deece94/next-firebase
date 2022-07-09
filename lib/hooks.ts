import { auth, firestore } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  Unsubscribe,
  DocumentReference,
} from "firebase/firestore";
import { EffectCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  // Listen to updates on user
  useEffect(() => {
    // turn off realtime subscrioption
    let unsubscribe: void | Unsubscribe;

    if (user) {
      // Get the user document that matched the user id
      const user_ref: DocumentReference = doc(firestore, "users", user.uid);

      // return a function that will unsubnscribe from the data
      unsubscribe = onSnapshot(user_ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
