import { SignInPage } from "@project/components/pages/sign_in_page";
import { useAuth } from "@project/hooks/use_auth";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { useRouter } from "next/router";

export default () => {
  const { signin } = useAuth();
  const { signInWithGoogle } = useAuthProviders();
  const router = useRouter();

  return (
    <SignInPage
      onCreateNewAccount={() => {
        router.push("./sign_up");
      }}
      onForgotPassword={() => {}}
      onLegacySignIn={() => {}}
      onLogInWithEmailPassword={({ email, password }) => {
        signin(email, password);
      }}
      onLogInWithGoogle={signInWithGoogle}
    ></SignInPage>
  );
};
