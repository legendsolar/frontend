import { getAuth, connectAuthEmulator } from "firebase/auth"; // Firebase v9+
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Firebase v9+
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { useTheme } from "@mui/material";

import {
  FirebaseAppProvider,
  DatabaseProvider,
  AuthProvider,
  useFirebaseApp,
  useFunctions,
  StorageProvider,
} from "reactfire";

const FirebaseWrapper = () => {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);
  auth.languageCode = "en";
  const functions = getFunctions(app);
  const storage = getStorage(app);

  const emulator =
    !!process.env.NEXT_PUBLIC_FIREBASE_EMULATOR &&
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == "TRUE";

  if (emulator) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectDatabaseEmulator(database, "localhost", 9000);
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectStorageEmulator(storage, "localhost", 9199);
  }

  return <></>;
};

export default FirebaseWrapper;
