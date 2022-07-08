import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function EnterPage({}) {
    const user = null;
    const username = null;
    // 1. User signed out <SignInButton />
    // 2. User signed in, but missing Username <UsernameForm />
    // 3. User signed in, has Username <SignOutButton />

    return (
        <main>
            {
                user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {

        try{
            await signInWithPopup(auth, googleAuthProvider);
        } catch(err) {
            alert(err);
        }
    }

    return(
        <button className='btn btn-primary' onClick={signInWithGoogle}>
            Sign In With Google
        </button>
    );
}

function SignOutButton() {
    return <button className='btn btn-primary' onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
    return <button></button>
}