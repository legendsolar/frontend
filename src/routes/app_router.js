import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useAuth } from "../hooks/use_auth";
import PortfolioPage from "../pages/portfolio_page";
import SignInView from "../pages/sign_in_page";
import SignUpView from "../pages/sign_up_page";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import UnprotectedRoute from "./unprotected_route";
import TransactionView from "../pages/transactions_page";

import LoadingView from "../views/loading_view";

import DesignSysDemo from "../debug/design_sys_demo";
import SignUpProcessPage from "../pages/complete_account_page";
import { GridPage } from "../pages/grid_page";
import ExplorePage from "../pages/explore_page";
import DocumentPage from "../pages/documents_page";
import PlaygroundPage from "../pages/playground_page";
import TransferPage from "../pages/transfer_page";
import AccountPage from "../pages/account_page";

import { useFirebaseApp, useFunctions } from "reactfire";

import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { useSelector, useDispatch } from "react-redux";
import InvestPage from "../pages/invest_page";

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
            <Routes>
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
                    path="/complete-account"
                    element={
                        <ProtectedRoute
                            disallowedUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            disallowedPath="/explore"
                        >
                            <SignUpProcessPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            requiredUserStates={["DWOLLA_ACCOUNT_VERIFIED"]}
                            requiredPath="/complete-account"
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
                            requiredPath="/complete-account"
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
                            requiredPath="/complete-account"
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
                            requiredPath="/complete-account"
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
                            requiredPath="/complete-account"
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
                            requiredPath="/complete-account"
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

                {/* Debug */}
                <Route path="/designSysDemo" element={<DesignSysDemo />} />
                <Route path="/loading" element={<LoadingView />} />
                <Route path="/gridView" element={<GridPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
