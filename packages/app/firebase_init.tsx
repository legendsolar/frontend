import { getAuth, connectAuthEmulator } from "firebase/auth"; // Firebase v9+
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Firebase v9+
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import {
  DatabaseProvider,
  AuthProvider,
  useFirebaseApp,
  StorageProvider,
} from "reactfire";

const FirebaseInit = ({ children }) => {
  const app = useFirebaseApp();

  console.log({ app });
  const database = getDatabase(app);

  console.log({ database });
  const auth = getAuth(app);
  const functions = getFunctions(app);
  const storage = getStorage(app);

  const emulator =
    !!process.env.REACT_APP_FIREBASE_EMULATOR &&
    process.env.REACT_APP_FIREBASE_EMULATOR == "TRUE";

  if (emulator) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectDatabaseEmulator(database, "localhost", 9000);
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectStorageEmulator(storage, "localhost", 9199);
  }

  return (
    <StorageProvider sdk={storage}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
      </AuthProvider>
    </StorageProvider>
  );
};

export default FirebaseInit;
