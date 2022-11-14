import {useAuth} from 'hooks/use_auth';
import {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import LoadingView from 'views/loading_view';
import {useUser} from 'hooks/use_user';
import {UserStatus} from 'schema/schema_gen_types';
import {ROUTES} from 'routes/routes';
import UnexpectedErrorPage from 'pages/unexpected_error_page';

interface ProtectedRouteProps {
    children: JSX.Element;
    verifiedUserRequired?: boolean;
    unverifiedUserRedirectPath?: ROUTES;
    unverifiedUserRequired?: boolean;
    verifiedUserRedirectPath?: ROUTES;
    unauthUserRedirectPath?: ROUTES;
}

const ProtectedRoute = ({
    children,
    verifiedUserRequired,
    unverifiedUserRedirectPath = ROUTES.COMPLETE_ACCOUNT,
    unverifiedUserRequired,
    verifiedUserRedirectPath = ROUTES.USER_HOME,
    unauthUserRedirectPath = ROUTES.CREATE_ACCOUNT,
}: ProtectedRouteProps) => {
    const auth = useAuth();
    const location = useLocation();

    const {useGetUserStatus} = useUser();

    /**
     * Only fetch if user auth is complete. Bug in Apollo Client
     * makes `skip` only works if false->true, but this works for this use case.
     *
     * Bug described in:
     * https://github.com/apollographql/apollo-client/issues/6190
     * https://github.com/apollographql/apollo-client/pull/6752
     *
     */
    const {loading, error, status, refetch} = useGetUserStatus(!auth.user);

    if (loading || auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    if (error) {
        return <UnexpectedErrorPage></UnexpectedErrorPage>;
    }

    if (!auth.user) {
        return (
            <Navigate
                to={unauthUserRedirectPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (verifiedUserRequired && !status?.verified && status) {
        return (
            <Navigate
                to={unverifiedUserRedirectPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (unverifiedUserRequired && status?.verified && status) {
        return (
            <Navigate
                to={verifiedUserRedirectPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;
