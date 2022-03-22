import { getAuth, connectAuthEmulator } from "firebase/auth"; // Firebase v9+
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Firebase v9+
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import {
    FirebaseAppProvider,
    DatabaseProvider,
    AuthProvider,
    useFirebaseApp,
    useFunctions,
    StorageProvider,
} from "reactfire";
import { ProvideCloudFunctions } from "./hooks/use_cloud_functions";

const FirebaseInit = ({ children }) => {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);
    const functions = getFunctions(app);
    const storage = getStorage(app);

    const emulator =
        !!process.env.REACT_APP_FIREBASE_EMULATOR &&
        process.env.REACT_APP_FIREBASE_EMULATOR == "TRUE";

    if (emulator) {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectDatabaseEmulator(database, "localhost", 9000);
        connectFunctionsEmulator(functions, "localhost", 5004);
        connectStorageEmulator(storage, "localhost", null);
    }

    return (
        <ProvideCloudFunctions functions={functions}>
            <StorageProvider sdk={storage}>
                <AuthProvider sdk={auth}>
                    <DatabaseProvider sdk={database}>
                        {children}
                    </DatabaseProvider>
                </AuthProvider>
            </StorageProvider>
        </ProvideCloudFunctions>
    );
};

export default FirebaseInit;
