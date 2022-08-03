import PortfolioPage from 'pages/portfolio_page';
import SignInView from 'pages/sign_in_page';
import SignUpView from 'pages/sign_up_page';
import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';
import ProtectedRoute from 'routes/protected_route';
import UnprotectedRoute from 'routes/unprotected_route';
import TransactionView from 'pages/transactions_page';
import SignUpProcessPage from 'pages/complete_account_page';
import CreateAccountPage from 'pages/create_account_page';
import ExplorePage from 'pages/explore_page';
import DocumentPage from 'pages/documents_page';
import WalletPage from 'pages/wallet_page';
import AccountPage from 'pages/account_page';

import TermsConditionsPage from 'pages/terms_conditions_page';

import {useFirebaseApp, useFunctions} from 'reactfire';

import {getDatabase, connectDatabaseEmulator} from 'firebase/database';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions';

import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';

import InvestPage from 'pages/invest_page';
import ErrorPage from 'pages/error_page';
import NotFoundPage from 'pages/not_found_page';
import PrivacyPolicyPage from 'pages/privacy_policy_page';

export const routes = {
    SIGN_IN: '/sign_in',
    CREATE_ACCOUNT: '/create',
    TERMS_AND_CONDITIONS: '/terms_conditions',
    PRIVACY_POLICY: '/privacy',
};

function AppRouter() {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);
    const functions = getFunctions(app);

    const emulator =
        !!process.env.REACT_APP_FIREBASE_EMULATOR &&
        process.env.REACT_APP_FIREBASE_EMULATOR == 'TRUE';

    if (emulator) {
        // connectAuthEmulator(auth, "http://localhost:9099");
        connectDatabaseEmulator(database, 'localhost', 9000);
        // connectFunctionsEmulator(functions, "localhost", 5004);
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/error" element={<ErrorPage />} />

                    {/** No auth required */}
                    <Route
                        path={routes.SIGN_IN}
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
                        path={routes.TERMS_AND_CONDITIONS}
                        element={
                            <UnprotectedRoute>
                                <TermsConditionsPage />
                            </UnprotectedRoute>
                        }
                    />

                    <Route
                        path={routes.PRIVACY_POLICY}
                        element={
                            <UnprotectedRoute>
                                <PrivacyPolicyPage></PrivacyPolicyPage>
                            </UnprotectedRoute>
                        }
                    />

                    <Route
                        path={routes.CREATE_ACCOUNT}
                        element={
                            <UnprotectedRoute>
                                <CreateAccountPage></CreateAccountPage>
                            </UnprotectedRoute>
                        }
                    />

                    {/** Auth required */}

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
                                requiredPath="/complete-account"
                            >
                                <PortfolioPage></PortfolioPage>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
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
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
                                requiredPath="/complete-account"
                            >
                                <WalletPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/wallet"
                        element={
                            <ProtectedRoute
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
                                requiredPath="/complete-account"
                            >
                                <WalletPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/documents"
                        element={
                            <ProtectedRoute
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
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
                                requiredUserStates={[
                                    USER_STATUS.IDENTITY_VERIFIED,
                                ]}
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
