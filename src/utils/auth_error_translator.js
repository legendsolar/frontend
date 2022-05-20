import {
    throwMfaRequiredError,
    throwSystemError,
    throwValidationError,
} from './errors';

export const authErrorHandler = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            throwValidationError({
                source: 'email',
                message: 'Email is invalid',
            });

        case 'auth/email-already-exists':
            throwValidationError({
                source: 'email',
                message: 'Email is already in use',
            });

        case 'auth/email-already-in-use':
            throwValidationError({
                source: 'email',
                message: 'Email is already in use',
            });

        case 'auth/invalid-password':
            throwValidationError({
                source: 'password',
                message: 'Password is invalid',
            });

        case 'auth/weak-password':
            throwValidationError({
                source: 'password',
                message:
                    'Password is too weak. Try using special characters or a longer one.',
            });

        case 'auth/user-not-found':
            throwValidationError({
                source: 'email',
                message: 'Email not found',
            });

        case 'auth/wrong-password':
            throwValidationError({
                source: 'password',
                message: 'Password is incorrect',
            });

        case 'auth/too-many-requests':
            throwSystemError({
                message: "You've made too many attempts",
            });

        case 'auth/invalid-verification-code':
            throwValidationError({
                source: 'code',
                message: 'Code is incorrect',
            });

        case 'auth/multi-factor-auth-required':
            throwMfaRequiredError({
                message: 'Multi factor authentication required',
                resolver: error.resolver,
            });

        /** THESE CASES BELOW SHOULD NOT HAPPEN IN NORMAL OPERATION */

        case 'auth/invernal-error':
            throwSystemError({
                message: 'An unexpected error occured',
            });

        case 'auth/network-request-failed':
            throwSystemError({
                message: 'Not connected to the internet',
            });

        case 'auth/invalid-continue-uri':
            throwSystemError({
                message: 'An unexpected error occured',
            });

        default:
            throwSystemError({
                message: 'An unexpected error occured',
            });
    }
};
