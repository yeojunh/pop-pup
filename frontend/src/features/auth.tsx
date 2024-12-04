import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../firebase.config';
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

    return (
        <>
            {isLoggedIn ? (
                <div className='text-garden-darkshade font-thin'>
                    <h3 className='p-2'>Welcome, {auth?.currentUser?.displayName?.split(' ')[0]}!</h3>
                    <button className='bg-garden-darkshade text-garden-lightshade px-5 py-1 rounded-2xl' onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className='text-garden-darkshade font-thin'>
                    <button onClick={signInWithGoogle}>Sign in with Google </button>
                </div>
            )} 
        </>
    );
};