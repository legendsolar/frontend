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
    PhoneMultiFactorGenerator,
    getMultiFactorResolver,
    UserCredential,
    User,
    MultiFactorResolver,
} from 'firebase/auth';

import {GoogleAuthProvider} from 'firebase/auth';
import settings from 'app_settings';
import {authErrorHandler} from 'utils/auth_error_translator';
import {
    ErrorTypes,
    throwAuthenticationError,
    throwSystemError,
} from 'utils/errors';
import {useApolloClient} from '@apollo/client';

const authContext = createContext<useAuthReturnType>({} as useAuthReturnType);

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = (): useAuthReturnType => {
    return useContext(authContext);
};

interface useAuthReturnType {
    isAuthenticating: boolean;
    authenticated: boolean;
    user: User | null;
    signin(email: string, password: string): Promise<void>;
    signup(
        email: string,
        password: string,
    ): Promise<UserCredential | undefined>;
    signout(): Promise<void>;
    signInWithGoogle(): Promise<void>;
    resetPassword(email: string): Promise<void>;
    sendEmailVerify(): Promise<void>;
    getRecaptchaVerifier(
        currentRef: HTMLElement,
        callback: () => void,
    ): RecaptchaVerifier;
    enrollUserMfa(phoneNumber: string, recaptchaVerifier): Promise<void>;
    sendMfaVerification(
        resolver: MultiFactorResolver,
        recaptchaVerifier: RecaptchaVerifier,
    ): Promise<string | undefined>;
    enrollWithMfaCode(code: string): Promise<void>;
    validateMfaCode(
        verificationId: string,
        code: string,
        resolver: MultiFactorResolver,
    ): Promise<void>;
}

const useProvideAuth = (): useAuthReturnType => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const client = useApolloClient();
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState<User | null>(null);

    const [mfaVerificationId, setMfaVerificationId] = useState<string | null>(
        null,
    );

    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

    const signin = async (email: string, password: string) => {
        // Removed to stop sign in components from unmounting
        // setIsAuthenticating(true);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            setUser(response.user);
        } catch (error: any) {
            if (error.code === 'auth/multi-factor-auth-required') {
                const resolver = getMultiFactorResolver(auth, error);
                error.resolver = resolver;
            }

            throw error;
        }

        // .finally(() => {
        //     // setIsAuthenticating(false);
        // });
    };

    const signup = async (email: string, password: string) => {
        // setIsAuthenticating(true);

        try {
            const resp = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            return resp;
        } catch (error: any) {
            authErrorHandler(error);
        }
        // .finally(() => {
        //     setIsAuthenticating(false);
        // });
    };

    const signout = async () => {
        setIsAuthenticating(true);

        try {
            await signOut(auth);

            setUser(null);
        } catch (error: any) {
            authErrorHandler(error);
        } finally {
            setIsAuthenticating(false);
        }
    };

    const signInWithGoogle = async () => {
        setIsAuthenticating(true);
        try {
            const response = await signInWithPopup(auth, provider);
            if (response) {
                setUser(response.user);
            }
        } catch (error: any) {
            authErrorHandler(error);
        } finally {
            setIsAuthenticating(false);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            authErrorHandler(error);
        }
    };

    const sendEmailVerify = async () => {
        try {
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

            if (user) {
                await sendEmailVerification(user, actionCodeSettings);
            } else {
                throwAuthenticationError({
                    message:
                        'cannot send email verification: user is not logged in',
                });
            }
        } catch (error: any) {
            authErrorHandler(error);
        }
    };

    const getRecaptchaVerifier = (
        currentRef: HTMLElement,
        callback: () => void,
    ) => {
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

    const handleMfaError = (error: any) => {
        try {
            authErrorHandler(error);
        } catch (error: any) {
            if (error?.type === ErrorTypes.NewLogInRequired) {
                // Sign the user out in 5s
                setTimeout(
                    () => {
                        signout();
                    },

                    5000,
                );
                throw error;
            } else {
                throw error;
            }
        }
    };

    const enrollUserMfa = async (phoneNumber: string, recaptchaVerifier) => {
        if (user) {
            const multiFactorUser = multiFactor(user);
            const multiFactorSession = await multiFactorUser.getSession();

            const phoneAuthProvider = new PhoneAuthProvider(auth);
            const phoneInfoOptions = {
                phoneNumber,
                session: multiFactorSession,
            };

            const verificationId = await phoneAuthProvider.verifyPhoneNumber(
                phoneInfoOptions,
                recaptchaVerifier,
            );
            setMfaVerificationId(verificationId);
        } else {
            throwAuthenticationError({
                message: 'cannot enroll user in mfa: not logged in',
            });
        }
    };

    const sendMfaVerification = async (
        resolver: MultiFactorResolver,
        recaptchaVerifier: RecaptchaVerifier,
    ): Promise<string | undefined> => {
        const phoneInfoOptions = {
            multiFactorHint: resolver.hints[0],
            session: resolver.session,
        };

        var phoneAuthProvider = new PhoneAuthProvider(auth);

        try {
            return await phoneAuthProvider.verifyPhoneNumber(
                phoneInfoOptions,
                recaptchaVerifier,
            );
        } catch (error) {
            handleMfaError(error);
        }
    };

    const enrollWithMfaCode = async (code: string) => {
        if (!mfaVerificationId) {
            throwSystemError({
                message:
                    'enrollUserMfa must be called first, mfa verification id is null',
            });
            return;
        }

        if (!user) {
            throwAuthenticationError({
                message: 'mfa enrollment not complete, user not signed in',
            });
            return;
        }

        try {
            const cred = PhoneAuthProvider.credential(mfaVerificationId, code);

            const multiFactorAssertion =
                PhoneMultiFactorGenerator.assertion(cred);

            const multiFactorUser = multiFactor(user);

            await multiFactorUser.enroll(multiFactorAssertion, 'phone number');
        } catch (error) {
            handleMfaError(error);
        }
    };

    const validateMfaCode = async (
        verificationId: string,
        code: string,
        resolver: MultiFactorResolver,
    ) => {
        try {
            const phoneAuthCredential = PhoneAuthProvider.credential(
                verificationId,
                code,
            );
            const multiFactorAssertion =
                PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
            await resolver.resolveSignIn(multiFactorAssertion);
        } catch (error) {
            handleMfaError(error);
        }
    };

    useEffect(() => {
        const clearUserData = onAuthStateChanged(auth, (user) => {
            if (!user) {
                client.resetStore();
            }
            setUser(user);
            setIsAuthenticating(false);
        });

        return () => clearUserData();
    }, []);

    return {
        isAuthenticating,
        authenticated: !!user,
        user,
        signin,
        signup,
        signout,
        resetPassword,
        signInWithGoogle,
        sendEmailVerify,
        getRecaptchaVerifier,
        enrollUserMfa,
        sendMfaVerification,
        enrollWithMfaCode,
        validateMfaCode,
    };
};
