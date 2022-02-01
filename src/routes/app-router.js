import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/use_auth";
import PortfolioView from "../pages/portfolio_page";
import SignInView from "../pages/sign_in_page";
import SignUpView from "../pages/sign_up_page";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import UnprotectedRoute from "./unprotected-route";
import AccountView from "../pages/account_page";
import TransactionView from "../pages/transactions_page";

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;
    const isAuthenticating = auth.isAuthenticating;

    // all other routes are assumed protected
    const unprotectedRoutes = ["/signIn", "/signUp", "/forgotPassword"];

    if (isAuthenticating) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <PortfolioView />
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
                        path="/user"
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
                </Routes>
            </div>
        );
    }
}

export default AppRouter;
