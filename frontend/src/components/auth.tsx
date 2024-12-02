import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
    // const [name, setName] = useState(""); 
    // const [email, setEmail] = useState(""); 
    // const [password, setPassword] = useState(""); 

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe(); 
    });

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }
    
    const logout = async () => {
        try {
            signOut(auth); 
        } catch (err) {
            console.log(err); 
        }
    }

    // const signIn = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    
    // const login = async () => {
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h3>Welcome, {auth?.currentUser?.displayName}</h3>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={signInWithGoogle}>Sign in with Google </button>
                    {/* sign in with email and password
                    <p>or</p> 
                    <input placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/> 
                    <br/>
                    <input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/> 
                    <br/>
                    <input placeholder="Enter your password" type='password' onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <br/>
                    <button onClick={login}>Log in</button>
                    <br/>
                    <button onClick={signIn}>Sign up</button>
                    */}
                </div>
            )} 
        </div>
    );
};