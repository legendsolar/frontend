import { useFirebaseApp } from "reactfire";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useAuth } from "./use_auth";

interface useAuthProvidersReturnType {}

export const useAuthProviders = () => {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const { isAuthenticating, setIsAuthenticating, setUser } = useAuth();

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    provider.addScope("user_birthday");
    setIsAuthenticating(true);

    const response = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(response);
    // const token = credential?.accessToken;

    // if (response) {
    //   setUser(response.user);
    // }

    setIsAuthenticating(false);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    console.log({
      provider,
    });

    provider.addScope("user_birthday");

    setIsAuthenticating(true);
    try {
      const response = await signInWithPopup(auth, provider);
      //   const credential = GoogleAuthProvider.credentialFromResult(response);
      //   const token = credential?.accessToken;

      //   if (response) {
      //     setUser(response.user);
      //   }
    } catch (error: any) {
      console.error({ error });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
  };
};
