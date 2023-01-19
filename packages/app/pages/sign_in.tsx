import { SignInPage } from "@project/components/pages/sign_in_page";
import { useAuth } from "@project/hooks/use_auth";
import { useRouter } from "next/router";

export default () => {
  const { signin, signInOrUpWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <SignInPage
      onCreateNewAccount={() => {
        router.push("./sign_up");
      }}
      onForgotPassword={() => {}}
      onLegacySignIn={() => {}}
      onLogInWithEmailPassword={async ({ email, password }) => {
        await signin(email, password);
      }}
      onLogInWithGoogle={signInOrUpWithGoogle}
    ></SignInPage>
  );
};
