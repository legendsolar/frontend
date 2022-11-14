import PortfolioPage from 'pages/portfolio_page';
import SignInView from 'pages/sign_in_page';
import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';
import ProtectedRoute from '../routes/protected_route';
import UnprotectedRoute from '../routes/unprotected_route';
import CreateAccountPage from 'pages/create_account_page';
import DocumentPage from 'pages/documents_page';
import WalletPage from 'pages/wallet_page';
import AccountPage from 'pages/account_page';
import TermsConditionsPage from 'pages/terms_conditions_page';
import PrivacyPolicyPage from 'pages/privacy_policy_page';
import CompleteAccountPage from 'pages/complete_account_page';
import {ROUTES} from '../routes/routes';
import DiscoverPage from 'pages/discover_page';
import TransactionPage from 'pages/transactions_page';
import {Navigate, useNavigate} from 'react-router-dom';
import UnexpectedErrorPage from 'pages/unexpected_error_page';
import OAuthLink from 'pages/plaid_oath_complete';
import DiscoverAssetPage from 'pages/discover_asset_page';
import ActionLinkHandlerPage from 'pages/action_link_handler_page';

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/error" element={<UnexpectedErrorPage />} />

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
                        path={ROUTES.DISCOVER + '/:assetId'}
                        element={
                            <ProtectedRoute verifiedUserRequired>
                                <DiscoverAssetPage></DiscoverAssetPage>
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
                        path={ROUTES.PLAID_OATH_COMPLETE}
                        element={<OAuthLink></OAuthLink>}
                    />

                    <Route
                        path={ROUTES.ACTION_LINK}
                        element={<ActionLinkHandlerPage />}
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
