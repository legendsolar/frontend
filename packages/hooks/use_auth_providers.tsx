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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    console.log({
      provider,
    });

    setIsAuthenticating(true);
    try {
      const response = await signInWithPopup(auth, provider);

      if (response) {
        setUser(response.user);
      }

      return response.user;
    } catch (error: any) {
      console.error({ error });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    signInWithGoogle,
  };
};
