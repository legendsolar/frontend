export const authErrorTranslator = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return {
                source: 'email',
                message: 'Email is invalid',
            };

        case 'auth/email-already-exists':
            return {
                source: 'email',
                message: 'Email is already in use',
            };

        case 'auth/email-already-in-use':
            return {
                source: 'email',
                message: 'Email is already in use',
            };

        case 'auth/invalid-password':
            return {
                source: 'password',
                message: 'Password is invalid',
            };

        case 'auth/weak-password':
            return {
                source: 'password',
                message: 'Password should be 6 or more characters long',
            };

        case 'auth/user-not-found':
            return {
                source: 'email',
                message: 'Email not found',
            };

        case 'auth/wrong-password':
            return {
                source: 'password',
                message: 'Password is incorrect',
            };

        // TODO this cases should not happen in normal operation
        case 'auth/invernal-error':
            return {
                source: 'password',
                message: 'An unexpected error has occured. ',
            };

        default:
            console.log(error);
            return {
                source: 'password',
                message: 'An unexpected error has occured. ',
            };
    }
};
