import { getAuth, connectAuthEmulator } from "firebase/auth"; // Firebase v9+
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Firebase v9+
import { connectFunctionsEmulator } from "firebase/functions";

import {
    FirebaseAppProvider,
    DatabaseProvider,
    AuthProvider,
    useFirebaseApp,
    useFunctions,
} from "reactfire";

const FirebaseInit = ({ children }) => {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);
    const functions = useFunctions();

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    const emulator =
        !!process.env.REACT_APP_FIREBASE_EMULATOR &&
        process.env.REACT_APP_FIREBASE_EMULATOR == "TRUE";

    if (emulator) {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectDatabaseEmulator(database, "localhost", 9000);
        connectFunctionsEmulator(functions, "localhost", 5004);
    }

    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <AuthProvider sdk={auth}>
                <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
            </AuthProvider>
        </FirebaseAppProvider>
    );
};

export default FirebaseInit;
