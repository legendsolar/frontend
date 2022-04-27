import React, {useState, useEffect, useContext, createContext} from 'react';
import {useDatabase, useFirebaseApp} from 'reactfire';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    signInWithPopup,
    getIdToken,
} from 'firebase/auth';

import {GoogleAuthProvider} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {clearUserState} from 'slices/user_slice';
import {clearTransactionState} from 'slices/transfer_slice';
import {clearWalletState} from 'slices/wallet_slice';

import {setContext} from '@apollo/client/link/context';

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

const setApolloContext = (user) => {
    setContext((_, {headers, ...context}) => {
        console.log('context ran:' + user);
        const token = user.token;
        return {
            headers: {
                ...headers,
                ...(token ? {authorization: `Bearer ${user.token}`} : {}),
            },
            ...context,
        };
    });
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);

    const apolloContext = setApolloContext(user);

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

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // TODO nuke apollo cache
                console.log('use auth: user auth state changed');
                console.log(user);
                console.log('clearing user state');

                console.log('dispatch clear user state: line 104, use auth');
                console.log(
                    'dispatch clear transaction state: line 104, use auth',
                );
                console.log('dispatch clear wallet state: line 104, use auth');
                dispatch(clearUserState());
                dispatch(clearTransactionState());
                dispatch(clearWalletState());

                console.log('dispatch should have finished');
            }
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
