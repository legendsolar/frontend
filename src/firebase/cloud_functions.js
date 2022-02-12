import { httpsCallable } from "firebase/functions";
import { functions } from "../Firebase";
const createDwollaAccount = httpsCallable(
    functions,
    "createNewVerifiedDwollaUser_ext"
);

const getWalletBalance = httpsCallable(functions, "getWalletBalance_ext");

export { createDwollaAccount, getWalletBalance };
