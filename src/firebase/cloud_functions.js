import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

/** Dwolla Pass Through Functions */

const createDwollaAccount = httpsCallable(
    functions,
    "createNewVerifiedDwollaUser_ext"
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

const firebaseDwollaCallWrapper = httpsCallable(
    functions,
    "dwollaNewCallWrapper_https_ext"
);

/** Dwolla */

// TODO less dumb way to populate this

export const getWalletBalance = httpsCallable(
    functions,
    "getWalletBalance_https_ext"
);
export const createTransfer = httpsCallable(
    functions,
    "createTransfer_https_ext"
);
export const getRecentTransfer = httpsCallable(
    functions,
    "getRecentTransfer_https_ext"
);

export const getKBASession = httpsCallable(
    functions,
    "getKBASession_https_ext"
);

export const returnKBASessionResponse = httpsCallable(
    functions,
    "returnKBASessionResponse_https_ext"
);

export const receiveIdVerificationDocument = httpsCallable(
    functions,
    "receiveIdVerificationDocument_https_ext"
);

export const attemptCreateNewDwollaVerifiedUser = httpsCallable(
    functions,
    "attemptCreateNewDwollaVerifiedUser_https_ext"
);

export {
    createDwollaAccount,
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
    firebaseDwollaCallWrapper,
};
