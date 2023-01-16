import { SignUpPage } from "@project/components/pages/sign_up_page";
import { useAuth } from "@project/hooks/use_auth";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { useRouter } from "next/router";
import { useReservations } from "utility/use_reservations";
import { parseUserDisplayName } from "@p/utils/google_utils";

export default () => {
  const { onSignInWithGoogle, onSignUpWithEmail, currentPanels } =
    useReservations();
  const router = useRouter();

  return (
    <SignUpPage
      signInWithGoogle={onSignInWithGoogle}
      onSignUpWithEmail={onSignUpWithEmail}
      onNavigateToSignIn={() => router.push("./sign_in")}
      panelsSelected={currentPanels}
    />
  );
};
