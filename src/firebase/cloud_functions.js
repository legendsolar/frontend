import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

/** Dwolla Pass Through Functions */

const createDwollaAccount = httpsCallable(
    functions,
    "createNewVerifiedDwollaUser_ext"
);

const getWalletBalance = httpsCallable(functions, "getWalletBalance_ext");

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

export {
    createDwollaAccount,
    getWalletBalance,
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
    firebaseDwollaCallWrapper,
};
