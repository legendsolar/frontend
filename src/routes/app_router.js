import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/use_auth";
import PortfolioPage from "../pages/portfolio_page";
import SignInView from "../pages/sign_in_page";
import SignUpView from "../pages/sign_up_page";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import UnprotectedRoute from "./unprotected_route";
import AccountView from "../pages/account_page";
import TransactionView from "../pages/transactions_page";

import LoadingView from "../views/loading_view";

import DesignSysDemo from "../debug/design_sys_demo";
import VerificationPage from "../pages/sign_up_process_page";
import SignUpProcessPage from "../pages/sign_up_process_page";
import { GridPage } from "../pages/grid_page";
import ExplorePage from "../pages/explore_page";
import DocumentPage from "../pages/documents_page";
import PlaygroundPage from "../pages/playground_page";
import { useFirebaseApp, useFunctions } from "reactfire";

import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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

    const authHook = useAuth();
    const isAuthenticating = authHook.isAuthenticating;

    if (isAuthenticating) {
        return <LoadingView></LoadingView>;
    } else {
        return (
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <PortfolioPage />
                            </ProtectedRoute>
                        }
                    />
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
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <AccountView />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/documents"
                        element={
                            <ProtectedRoute>
                                <DocumentPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/complete-account"
                        element={
                            <ProtectedRoute>
                                <SignUpProcessPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transactions"
                        element={
                            <ProtectedRoute>
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

                    {/* Debug */}
                    <Route path="/designSysDemo" element={<DesignSysDemo />} />
                    <Route path="/loading" element={<LoadingView />} />
                    <Route path="/gridView" element={<GridPage />} />
                    <Route path="/playground" element={<PlaygroundPage />} />
                </Routes>
            </div>
        );
    }
}

export default AppRouter;
