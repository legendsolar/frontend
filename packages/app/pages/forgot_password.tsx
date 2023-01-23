import { ForgotPasswordPage } from "@project/components/pages/forgot_password_page";
import { useAuth } from "@project/hooks/use_auth";
import { useRouter } from "next/router";

export default () => {
  const { resetPassword } = useAuth();

  return <ForgotPasswordPage></ForgotPasswordPage>;
};
