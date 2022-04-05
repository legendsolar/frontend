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
import ErrorPage from "../pages/error_page";
import NotFoundPage from "../pages/not_found_page";
import { signUpOrder } from "../utils/user_sign_up_state";
import SizingDemo from "../debug/sizing_demo";
import AirtableTestPage from "../pages/airtable_test_page";
import ComponentView from "../views/component_view";

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

                {/* Debug */}
                <Route path="/designSysDemo" element={<DesignSysDemo />} />
                <Route path="/sizingDemo" element={<SizingDemo />} />
                <Route path="/component" element={<ComponentView />} />
                <Route path="/loading" element={<LoadingView />} />
                <Route path="/gridView" element={<GridPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/airtable" element={<AirtableTestPage />} />

                <Route path="/:path" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
