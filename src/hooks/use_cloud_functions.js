import { httpsCallable } from "firebase/functions";
import { createContext, useContext } from "react";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideCloudFunctions({ functions, children }) {
    const auth = useProvideCloudFunctions(functions);
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useCloudFunctions = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
const useProvideCloudFunctions = (functions) => {
    /** Dwolla Pass Through Functions */
    const createDwollaAccount = httpsCallable(
        functions,
        "createNewVerifiedDwollaUser_ext"
    );

    const updateDwollaUser = httpsCallable(
        functions,
        "updateDwollaUser_https_ext"
    );

    /** Plaid Pass Through Functions */

    const createPlaidLinkToken = httpsCallable(
        functions,
        "createPlaidLinkToken_https_ext"
    );
    const exchangePublicTokenForAccessToken = httpsCallable(
        functions,
        "exchangePublicTokenForAccessToken_https_ext"
    );

    /** User functions */

    const getUserSignUpState = httpsCallable(
        functions,
        "getUserSignUpState_https_ext"
    );

    const updateUserAcceptanceState = httpsCallable(
        functions,
        "updateUserAcceptanceState_https_ext"
    );

    /** Dwolla */

    const getWalletBalance = httpsCallable(
        functions,
        "getWalletBalance_https_ext"
    );

    const createTransfer = httpsCallable(functions, "createTransfer_https_ext");

    const getRecentTransfers = httpsCallable(
        functions,
        "getRecentTransfer_https_ext"
    );

    const generateTransferSummary = httpsCallable(
        functions,
        "generateTransferSummary_https_ext"
    );

    const getKBASession = httpsCallable(functions, "getKBASession_https_ext");

    const returnKBASessionResponse = httpsCallable(
        functions,
        "returnKBASessionResponse_https_ext"
    );

    const receiveIdVerificationDocument = httpsCallable(
        functions,
        "receiveIdVerificationDocument_https_ext"
    );

    const attemptCreateNewDwollaVerifiedUser = httpsCallable(
        functions,
        "attemptCreateNewDwollaVerifiedUser_https_ext"
    );

    const getLinkedAccounts = httpsCallable(
        functions,
        "getLinkedAccounts_https_ext"
    );
    // Return the user object and auth methods
    return {
        createDwollaAccount,
        updateDwollaUser,
        createPlaidLinkToken,
        exchangePublicTokenForAccessToken,
        getUserSignUpState,
        updateUserAcceptanceState,
        getWalletBalance,
        createTransfer,
        getRecentTransfers,
        getKBASession,
        returnKBASessionResponse,
        receiveIdVerificationDocument,
        attemptCreateNewDwollaVerifiedUser,
        getLinkedAccounts,
        generateTransferSummary,
    };
};
