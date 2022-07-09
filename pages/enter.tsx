import { auth, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  // 1. User signed out <SignInButton />
  // 2. User signed in, but missing Username <UsernameForm />
  // 3. User signed in, has Username <SignOutButton />

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <button className="btn btn-primary" onClick={signInWithGoogle}>
      Sign In With Google
    </button>
  );
}

function SignOutButton() {
  return (
    <button className="btn btn-primary" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  // Check databse for username match
  // debounce requires useCallback hook to work
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username && username.length > 3) {
        const usernames_ref = doc(firestore, "usernames", username);

        const doc_get = await getDoc(usernames_ref);

        setIsValid(!doc_get.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  // On formValue Update call username checking function
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e) => {
    // Format input
    const val = e.target?.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Validate length
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    // If regex passes start loading and invalid while value is checked against DB
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // On submission save the data to the DB
  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for user and usernames
    const userRef = doc(firestore, "users", user.uid);
    const usernameRef = doc(firestore, "usernames", formValue);
    try {
      // commit docs together in batch write
      const batch = writeBatch(firestore);
      const userDoc = {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      };
      batch.set(userRef, userDoc);

      const usernameDoc = {
        uid: user.uid,
      };
      batch.set(usernameRef, usernameDoc);

      // Commit batch
      await batch.commit();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
          autoComplete="off"
        />

        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Choose
        </button>

        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
        />

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Username taken</p>;
  } else {
    return <p></p>;
  }
}
