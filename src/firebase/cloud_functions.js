import { httpsCallable } from "firebase/functions";
import { functions } from "../Firebase";

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

export {
    createDwollaAccount,
    getWalletBalance,
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
};
