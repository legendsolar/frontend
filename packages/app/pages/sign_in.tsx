import { EXTERNAL_LINKS, redirect } from "@p/utils/webflow/webflowLinking";
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
      onForgotPassword={() => {
        router.push("./forgot_password");
      }}
      onLegacySignIn={() => {
        redirect(EXTERNAL_LINKS.SIGN_IN);
      }}
      onLogInWithEmailPassword={async ({ email, password }) => {
        await signin(email, password);
      }}
      onLogInWithGoogle={signInOrUpWithGoogle}
    ></SignInPage>
  );
};
