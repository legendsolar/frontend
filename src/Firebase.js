import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import {
    getAuth,
    onAuthStateChanged,
    connectAuthEmulator,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";

const emulator = false;
// process.env.FB_EMULATORS && process.env.FB_EMULATORS == "true"
//     ? true
//     : false;
console.log(process.env.FB_EMULATORS);

const firebaseConfig = {
    apiKey: "AIzaSyBMNSth898JP2cfGkoh3ZZd91AO-6RWTg4",
    authDomain: "legends-alpha-prod.firebaseapp.com",
    databaseURL: "https://legends-alpha-prod-default-rtdb.firebaseio.com",
    projectId: "legends-alpha-prod",
    storageBucket: "legends-alpha-prod.appspot.com",
    messagingSenderId: "627679343299",
    appId: "1:627679343299:web:2cc7d5603f538476256876",
    measurementId: "G-8JZL5S5VET",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const functions = getFunctions(firebaseApp);

if (emulator) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectDatabaseEmulator(database, "localhost", 9000);
    connectFunctionsEmulator(functions, "localhost", 5004);
}
// Export Firebase singletons
export { firebaseApp, database, auth, functions };
