import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

import {
    getAuth,
    onAuthStateChanged,
    connectAuthEmulator,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";

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

// Get a reference to the database service
const database = getDatabase(firebaseApp);

const emulator = false;

if (emulator) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectDatabaseEmulator(database, "localhost", 9000);
}
// Export Firebase singletons
export { firebaseApp, database, auth };
