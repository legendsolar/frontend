import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/use_auth";
import PortfolioPage from "../pages/portfolio_page";
import SignInView from "../pages/sign_in_page";
import SignUpView from "../pages/sign_up_page";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import UnprotectedRoute from "./unprotected-route";
import AccountView from "../pages/account_page";
import TransactionView from "../pages/transactions_page";

import LoadingView from "../views/loading_view";

import DesignSysDemo from "../debug/design_sys_demo";

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;
    const isAuthenticating = auth.isAuthenticating;

    // all other routes are assumed protected
    const unprotectedRoutes = ["/signIn", "/signUp", "/forgotPassword"];

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
                        path="/transactions"
                        element={
                            <ProtectedRoute>
                                <TransactionView />
                            </ProtectedRoute>
                        }
                    />

                    {/* Debug */}
                    <Route path="/designSysDemo" element={<DesignSysDemo />} />
                </Routes>
            </div>
        );
    }
}

export default AppRouter;
