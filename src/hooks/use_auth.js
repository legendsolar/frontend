import React, { useState, useEffect, useContext, createContext } from "react";
import { useDatabase, useFirebaseApp } from "reactfire";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    signInWithPopup,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUserState } from "../slices/user_slice";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const database = useDatabase();
    // const [userData, setUserData] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const dispatch = useDispatch();

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        setIsAuthenticating(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                setUser(response.user);
            })
            .finally(() => {
                setIsAuthenticating(false);
            });
    };

    const signup = (email, password) => {
        setIsAuthenticating(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                if (response) {
                    setUser(response.user);
                }
            })
            .finally(() => {
                setIsAuthenticating(false);
            });
    };

    const signout = () => {
        setIsAuthenticating(true);
        return signOut(auth)
            .then(() => {
                setUser(null);
            })
            .finally(() => {
                setIsAuthenticating(false);
            });
    };

    const signInWithGoogle = () => {
        setIsAuthenticating(true);
        return signInWithPopup(auth, provider)
            .then((response) => {
                if (response) {
                    setUser(response.user);
                }
            })
            .finally(() => {
                setIsAuthenticating(false);
            });
    };

    // const userDataSnap = () => {
    //     if (user.uid) {
    //         return useObject(ref(database, "users/" + user.uid));
    //     }
    //     return null;
    // };

    // const sendPasswordResetEmail = (email) => {
    //     return firebase
    //         .auth()
    //         .sendPasswordResetEmail(email)
    //         .then(() => {
    //             return true;
    //         });
    // };
    // const confirmPasswordReset = (code, password) => {
    //     return firebase
    //         .auth()
    //         .confirmPasswordReset(code, password)
    //         .then(() => {
    //             return true;
    //         });
    // };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("use auth: user auth state changed");
            console.log("clearing user state");
            dispatch(clearUserState);
            setUser(user);
            setIsAuthenticating(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        isAuthenticating,
        user,
        signin,
        signup,
        signout,
        signInWithGoogle,
        // userDataSnap,
    };
}
