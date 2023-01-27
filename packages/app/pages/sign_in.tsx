import { EXTERNAL_LINKS, redirect } from "@p/utils/webflow/webflowLinking";
import { SignInPage } from "@project/components/pages/sign_in_page";
import { useAuth } from "@project/hooks/use_auth";
import { useReservations } from "@project/hooks/use_reservations";
import { useRouter } from "next/router";

export default () => {
  const { signin, signInOrUpWithGoogle } = useAuth();
  const { redirect } = useReservations();

  return (
    <SignInPage
      onCreateNewAccount={() => {
        redirect("./sign_up");
      }}
      onForgotPassword={() => {
        redirect("./forgot_password");
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
