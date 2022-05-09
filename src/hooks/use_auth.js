import React, {useState, useEffect, useContext, createContext} from 'react';
import {useDatabase, useFirebaseApp} from 'reactfire';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification,
    RecaptchaVerifier,
    multiFactor,
    PhoneAuthProvider,
} from 'firebase/auth';

import {GoogleAuthProvider} from 'firebase/auth';

import {setContext} from '@apollo/client/link/context';
import settings from 'app_settings';

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

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const sendEmailVerify = () => {
        console.log(settings.emailVerificationRedirectUrl);
        const actionCodeSettings = {
            url: settings.emailVerificationRedirectUrl,
            iOS: {
                bundleId: 'com.example.ios',
            },
            android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12',
            },
            handleCodeInApp: false,
        };

        return sendEmailVerification(user, actionCodeSettings);
    };

    const getRecaptchaVerifier = (currentRef, callback) => {
        const captcha = new RecaptchaVerifier(
            currentRef,
            {
                size: 'invisible',
                callback,
            },

            auth,
        );

        return captcha;
    };

    const enrollUserMfa = (phoneNumber, recaptchaVerifier) => {
        const multiFactorUser = multiFactor(user);
        multiFactorUser.getSession().then((multiFactorSession) => {
            const phoneAuthProvider = new PhoneAuthProvider(auth);
            const phoneInfoOptions = {
                phoneNumber,
                session: multiFactorSession,
            };

            return phoneAuthProvider.verifyPhoneNumber(
                phoneInfoOptions,
                recaptchaVerifier,
            );
        });
    };

    const submitMfaCode = (verificationId, code) => {
        const cred = PhoneAuthProvider.credential(verificationId, code);

        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        const multiFactorUser = multiFactor(user);

        multiFactorUser.enroll(multiFactorAssertion, 'phone number');

        console.log('mfa enrolled');
    };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // TODO nuke apollo cache
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
        resetPassword,
        signInWithGoogle,
        sendEmailVerify,
        getRecaptchaVerifier,
        enrollUserMfa,
        submitMfaCode,
    };
}
