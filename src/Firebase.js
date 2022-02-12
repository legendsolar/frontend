import { getApp, initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";

<<<<<<< HEAD
const emulator =
    !!process.env.REACT_APP_FIREBASE_EMULATOR &&
    process.env.REACT_APP_FIREBASE_EMULATOR == "TRUE";

console.log("EMULATOR STATE: " + emulator);

console.log({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// Initialize Firebase
const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
=======
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
>>>>>>> cb920060651d31462d8b51cb105e044744adb090

if (emulator) {
    connectAuthEmulator(auth, "localhost", 9099);
    connectDatabaseEmulator(database, "localhost", 9000);
    connectFunctionsEmulator(functions, "localhost", 5004);
}
<<<<<<< HEAD

export { firebaseApp, database, auth };
=======
// Export Firebase singletons
export { firebaseApp, database, auth, functions };
>>>>>>> cb920060651d31462d8b51cb105e044744adb090
