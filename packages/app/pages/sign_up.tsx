import { SignUpPage } from "@project/components/pages/sign_up_page";
import { useAuthProviders } from "@project/hooks/use_auth_providers";
import { useRouter } from "next/router";

export default () => {
  const { signInWithGoogle } = useAuthProviders();
  const router = useRouter();

  return <SignUpPage signInWithGoogle={signInWithGoogle} />;
};
