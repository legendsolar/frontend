import { SignUpPage } from "@project/components/pages/sign_up_page";
import { useAuth } from "@project/hooks/use_auth";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { useRouter } from "next/router";
import { useReservations } from "utility/use_reservations";

export default () => {
  const { signInWithGoogle } = useAuthProviders();
  const { signup } = useAuth();

  const { updateUser } = useReservations();
  const router = useRouter();

  return (
    <SignUpPage
      signInWithGoogle={signInWithGoogle}
      onSignUpWithEmail={async (values) => {
        console.log({ values });
        await signup(values.email, values.password);
        updateUser({
          firstName: values.firstName,
          lastName: values.lastName,
        });
      }}
      onNavigateToSignIn={() => router.push("./sign_in")}
    />
  );
};
