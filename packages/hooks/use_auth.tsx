import React, { useState, useEffect, useContext, createContext } from "react";
import { useFirebaseApp } from "reactfire";
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
  updatePassword,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { authErrorHandler } from "@p/utils/auth_error_translator";
import {
  ErrorTypes,
  throwAuthenticationError,
  throwSystemError,
} from "@p/utils/errors";
import { useApolloClient } from "@apollo/client";
import { useAnalytics } from "./use_analytics";

const authContext = createContext<useAuthReturnType>({} as useAuthReturnType);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = (): useAuthReturnType => {
  return useContext(authContext);
};

interface useAuthReturnType {
  isAuthenticating: boolean;
  setIsAuthenticating(authenticating: boolean): void;
  authenticated: boolean;
  user: User | null;
  currentError: any | undefined;
  setUser(user: User): void;
  signin(email: string, password: string): Promise<void>;
  signInOrUpWithGoogle(): Promise<User | null>;
  signup(email: string, password: string): Promise<UserCredential | undefined>;
  signout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  updateUserPassword(password: string): Promise<void>;
  sendEmailVerify(): Promise<void>;
  getRecaptchaVerifier(
    currentRef: HTMLElement,
    callback: () => void
  ): RecaptchaVerifier;
  enrollUserMfa(phoneNumber: string, recaptchaVerifier): Promise<void>;
  sendMfaVerification(
    resolver: MultiFactorResolver,
    recaptchaVerifier: RecaptchaVerifier
  ): Promise<string | undefined>;
  completeMfaEnrollment(code: string): Promise<void>;
  validateMfaCode(
    verificationId: string,
    code: string,
    resolver: MultiFactorResolver
  ): Promise<void>;
}

const useProvideAuth = (): useAuthReturnType => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const client = useApolloClient();
  const { posthog } = useAnalytics();
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState<User | null>(null);
  const [currentError, setCurrentError] = useState<Error | undefined>(
    undefined
  );

  const [mfaVerificationId, setMfaVerificationId] = useState<string | null>(
    null
  );

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  const errorHandler = (error: any) => {
    posthog.capture("auth_error", error);
    try {
      authErrorHandler(error);
    } catch (transformedError: any) {
      setCurrentError(transformedError);
      throw error;
    }
  };

  const signin = async (email: string, password: string) => {
    // Removed to stop sign in components from unmounting
    // setIsAuthenticating(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      setUser(response.user);
    } catch (error: any) {
      if (error.code === "auth/multi-factor-auth-required") {
        const resolver = getMultiFactorResolver(auth, error);
        error.resolver = resolver;

        throw error;
      } else {
        errorHandler(error);
      }
    }
  };

  const signInOrUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    console.log({
      provider,
    });

    try {
      const response = await signInWithPopup(auth, provider);

      if (response) {
        setUser(response.user);
      }

      return response.user;
    } catch (error: any) {
      errorHandler(error);
    } finally {
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);

      return resp;
    } catch (error: any) {
      errorHandler(error);
    } finally {
    }
  };

  const signout = async () => {
    console.log("signout called");

    setIsAuthenticating(true);

    try {
      await signOut(auth);

      setUser(null);
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      errorHandler(error);
    }
  };

  const updateUserPassword = async (password: string) => {
    try {
      if (user) {
        await updatePassword(user, password);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const sendEmailVerify = async () => {
    try {
      const actionCodeSettings = {
        url: settings.emailVerificationRedirectUrl,
        iOS: {
          bundleId: "com.example.ios",
        },
        android: {
          packageName: "com.example.android",
          installApp: true,
          minimumVersion: "12",
        },
        handleCodeInApp: false,
      };

      if (user) {
        await sendEmailVerification(user, actionCodeSettings);
      } else {
        throwAuthenticationError({
          message: "cannot send email verification: user is not logged in",
        });
      }
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const getRecaptchaVerifier = (
    currentRef: HTMLElement,
    callback: () => void
  ) => {
    const captcha = new RecaptchaVerifier(
      currentRef,
      {
        size: "invisible",
        callback,
      },

      auth
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

          5000
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
        recaptchaVerifier
      );
      setMfaVerificationId(verificationId);
    } else {
      throwAuthenticationError({
        message: "cannot enroll user in mfa: not logged in",
      });
    }
  };

  const sendMfaVerification = async (
    resolver: MultiFactorResolver,
    recaptchaVerifier: RecaptchaVerifier
  ): Promise<string | undefined> => {
    const phoneInfoOptions = {
      multiFactorHint: resolver.hints[0],
      session: resolver.session,
    };

    var phoneAuthProvider = new PhoneAuthProvider(auth);

    try {
      return await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        recaptchaVerifier
      );
    } catch (error) {
      handleMfaError(error);
    }
  };

  const enrollWithMfaCode = async (code: string) => {
    if (!mfaVerificationId) {
      throwSystemError({
        message:
          "enrollUserMfa must be called first, mfa verification id is null",
      });
      return;
    }

    if (!user) {
      throwAuthenticationError({
        message: "mfa enrollment not complete, user not signed in",
      });
      return;
    }

    try {
      const cred = PhoneAuthProvider.credential(mfaVerificationId, code);

      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      const multiFactorUser = multiFactor(user);

      await multiFactorUser.enroll(multiFactorAssertion, "phone number");
    } catch (error) {
      handleMfaError(error);
    }
  };

  const validateMfaCode = async (
    verificationId: string,
    code: string,
    resolver: MultiFactorResolver
  ) => {
    try {
      const phoneAuthCredential = PhoneAuthProvider.credential(
        verificationId,
        code
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

  useEffect(() => {
    if (process.env.REACT_APP_PRE_SIGNED_DEMO === "true") {
      if (!user) {
        // this is super dumb
        signInWithEmailAndPassword(auth, "demo@legends.solar", "password1234");
      }
    }
  }, []);

  return {
    isAuthenticating,
    setIsAuthenticating,
    authenticated: !!user,
    user,
    currentError,
    setUser,
    signin,
    signInOrUpWithGoogle,
    signup,
    signout,
    resetPassword,
    updateUserPassword,
    sendEmailVerify,
    getRecaptchaVerifier,
    enrollUserMfa,
    sendMfaVerification,
    completeMfaEnrollment: enrollWithMfaCode,
    validateMfaCode,
  };
};
