import { SignUpPage } from "@project/components/pages/sign_up_page";
import { useAuth } from "@project/hooks/use_auth";
import { useRouter } from "next/router";
import { useReservations } from "@project/hooks/use_reservations";
import { parseUserDisplayName } from "@p/utils/google_utils";

export default () => {
  const { onSignInWithGoogle, onSignUpWithEmail, currentPanels, redirect } =
    useReservations();
  const router = useRouter();

  return (
    <SignUpPage
      onSignUpWithGoogle={onSignInWithGoogle}
      onSignUpWithEmail={onSignUpWithEmail}
      onNavigateToSignIn={() => redirect("./sign_in")}
      panelsSelected={currentPanels}
    />
  );
};
