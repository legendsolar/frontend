export const authErrorTranslator = (error) => {
    switch (error.code) {
        case "auth/invalid-email":
            return {
                type: "email",
                message: "Email is invalid",
            };

        case "auth/email-already-exists":
            return {
                type: "email",
                message: "Email is already in use",
            };

        case "auth/invalid-password":
            return {
                type: "password",
                message: "Password is invalid",
            };

        case "auth/weak-password":
            return {
                type: "password",
                message: "Password should be 6 or more characters long",
            };

        case "auth/user-not-found":
            return {
                type: "email",
                message: "Email not found",
            };

        case "auth/wrong-password":
            return {
                type: "password",
                message: "Password is incorrect",
            };

        // TODO this cases should not happen in normal operation
        case "auth/invernal-error":
            return {
                type: "password",
                message: "An unexpected error has occured. ",
            };

        default:
            return {
                type: "password",
                message: "An unexpected error has occured. ",
            };
    }
};
