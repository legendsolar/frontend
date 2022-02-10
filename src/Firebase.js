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
    apiKey: "AIzaSyD9tNHU9n8yCQPaydXlu7WQro1SN6qVKfI",
    authDomain: "legends-alpha.firebaseapp.com",
    projectId: "legends-alpha",
    storageBucket: "legends-alpha.appspot.com",
    messagingSenderId: "187562843550",
    appId: "1:187562843550:web:fdf935a6ac55836623ca8f",
    measurementId: "${config.measurementId}",
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
