import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../../firebase.config";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="font-thin flex space-x-6 justify-end p-5">
            <Home />
            <About />
            <LoginOut />
        </div>
    )
}

const Home = () => {
    return (
        <Link to="/">
            <button>
                Home
            </button>
        </Link>
    )
}

const About = () => {
    return (
        <Link to="/about">
            <button>
                About
            </button>
        </Link>
    )
}

const LoginOut = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
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
    };
  
    const logout = async () => {
      try {
        signOut(auth);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        {isLoggedIn ? (
          <div>
            <a onClick={logout}>
              <button>
                Logout
              </button>
            </a>
          </div>
        ) : (
          <div>
            <a onClick={signInWithGoogle}>
              <button>
                Sign in with Google 
              </button>
            </a>
          </div>
        )}
      </>
    );
};

export default Navbar;