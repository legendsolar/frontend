import PortfolioPage from "../pages/portfolio_page";
import SignInView from "../pages/sign_in_page";
import SignUpView from "../pages/sign_up_page";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import UnprotectedRoute from "./unprotected_route";
import TransactionView from "../pages/transactions_page";
import SignUpProcessPage from "../pages/complete_account_page";
import ExplorePage from "../pages/explore_page";
import DocumentPage from "../pages/documents_page";
import TransferPage from "../pages/transfer_page";
import AccountPage from "../pages/account_page";

import { useFirebaseApp, useFunctions } from "reactfire";

import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import InvestPage from "../pages/invest_page";
import ErrorPage from "../pages/error_page";
import NotFoundPage from "../pages/not_found_page";

function AppRouter() {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);
    const functions = getFunctions(app);

    const emulator =
        !!process.env.REACT_APP_FIREBASE_EMULATOR &&
        process.env.REACT_APP_FIREBASE_EMULATOR == "TRUE";

    if (emulator) {
        // connectAuthEmulator(auth, "http://localhost:9099");
        connectDatabaseEmulator(database, "localhost", 9000);
        // connectFunctionsEmulator(functions, "localhost", 5004);
    }

    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/error" element={<ErrorPage />} />

                {/** No auth required */}
                <Route
                    path="/signin"
                    element={
                        <UnprotectedRoute>
                            <SignInView />
                        </UnprotectedRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <UnprotectedRoute>
                            <SignUpView />
                        </UnprotectedRoute>
                    }
                />

                <Route
                    path="/complete-account/:status"
                    element={<SignUpProcessPage />}
                />

                {/** Auth required */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <PortfolioPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <AccountPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transfer"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <TransferPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/wallet"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <TransferPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/documents"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <DocumentPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account/create"
                        >
                            <TransactionView />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/explore"
                    element={
                        <ProtectedRoute>
                            <ExplorePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invest/:assetName"
                    element={
                        <ProtectedRoute>
                            <InvestPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/:path" element={<NotFoundPage />} />
            </Routes>
</BrowserRouter>
        </div>
    );
}

export default AppRouter;
