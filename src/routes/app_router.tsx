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

import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';

import InvestPage from 'pages/invest_page';
import ErrorPage from 'pages/error_page';
import NotFoundPage from 'pages/not_found_page';
import PrivacyPolicyPage from 'pages/privacy_policy_page';
import {UserStatus} from 'schema/schema_gen_types';
import CompleteAccountContent from 'content/complete_account_content';
import CompleteAccountPage from 'pages/complete_account_page';
import {ROUTES} from 'routes/routes';
import DiscoverPage from 'pages/discover_page';
import TransactionPage from 'pages/transactions_page';
import {Navigate, useNavigate} from 'react-router-dom';

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/error" element={<ErrorPage />} />

                    {/** No auth required */}
                    <Route
                        path={ROUTES.SIGN_IN}
                        element={
                            <UnprotectedRoute>
                                <SignInView />
                            </UnprotectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.TERMS_AND_CONDITIONS}
                        element={
                            <UnprotectedRoute>
                                <TermsConditionsPage />
                            </UnprotectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.PRIVACY_POLICY}
                        element={
                            <UnprotectedRoute>
                                <PrivacyPolicyPage></PrivacyPolicyPage>
                            </UnprotectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.CREATE_ACCOUNT}
                        element={
                            <UnprotectedRoute>
                                <CreateAccountPage></CreateAccountPage>
                            </UnprotectedRoute>
                        }
                    />

                    {/** Auth required */}

                    <Route
                        path={ROUTES.COMPLETE_ACCOUNT}
                        element={
                            <ProtectedRoute unverifiedUserRequired>
                                <CompleteAccountPage></CompleteAccountPage>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.USER_HOME}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <PortfolioPage></PortfolioPage>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.DISCOVER}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <DiscoverPage></DiscoverPage>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.DOCUMENTS}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <DocumentPage></DocumentPage>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.TRANSACTIONS}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <TransactionPage></TransactionPage>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ACCOUNT}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <AccountPage></AccountPage>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.WALLET}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <WalletPage></WalletPage>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/:path"
                        element={
                            <Navigate
                                to={ROUTES.USER_HOME}
                                replace
                                state={{
                                    path: location.pathname,
                                }}
                            />
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={ROUTES.USER_HOME}
                                replace
                                state={{
                                    path: location.pathname,
                                }}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;
