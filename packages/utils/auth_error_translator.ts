import {
  throwMfaRequiredError,
  throwNewLogInRequired,
  throwSystemError,
  throwValidationError,
  ErrorTypes,
} from "./errors";

/**
 * Attempts to transform Firebase related error
 * @param {*} error
 */
export const authErrorHandler = (error: any) => {
  if (Object.values(ErrorTypes).includes(error?.type)) {
    // already transformed
    throw error;
  }
  if (error?.code?.includes("auth/blocking-function-error-response")) {
    throwSystemError({
      message: "You are not allowed to create an account",
    });
  }

  switch (error.code) {
    case "auth/invalid-email":
      throwValidationError({
        source: "email",
        message: "Email is invalid",
      });
      return;

    case "auth/email-already-exists":
      throwValidationError({
        source: "email",
        message: "Email is already in use",
      });
      return;

    case "auth/email-already-in-use":
      throwValidationError({
        source: "email",
        message: "Email is already in use",
      });
      return;

    case "auth/invalid-password":
      throwValidationError({
        source: "password",
        message: "Password is invalid",
      });
      return;

    case "auth/weak-password":
      throwValidationError({
        source: "password",
        message:
          "Password is too weak. Try using special characters or a longer one.",
      });
      return;

    case "auth/user-not-found":
      throwValidationError({
        source: "email",
        message: "Email not found",
      });
      return;

    case "auth/wrong-password":
      throwValidationError({
        source: "password",
        message: "Password is incorrect",
      });
      return;

    case "auth/too-many-requests":
      throwSystemError({
        message: "You've made too many attempts",
      });
      return;

    case "auth/invalid-verification-code":
      throwValidationError({
        source: "code",
        message: "Code is incorrect",
      });
      return;

    case "auth/multi-factor-auth-required":
      throwMfaRequiredError(
        {
          message: "Multi factor authentication required",
        },
        error.resolver
      );

      return;
    case "auth/requires-recent-login":
      throwNewLogInRequired({
        source: "code",
        message: "You're required to log out to complete this operation",
      });
      return;

    case "auth/popup-closed-by-user":
      throwSystemError({
        message: "Sign up cancled",
      });
      return;

    /** THESE CASES BELOW SHOULD NOT HAPPEN IN NORMAL OPERATION */

    case "auth/invernal-error":
      throwSystemError({
        message: "An unexpected error occured",
      });
      return;

    case "auth/network-request-failed":
      throwSystemError({
        message: "Failed to connect, contact support@legends.solar",
      });
      return;

    case "auth/invalid-continue-uri":
      throwSystemError({
        message: "An unexpected error occured",
      });
      return;

    default:
      throwSystemError({
        message: "An unexpected error occured",
      });
      return;
  }
};
