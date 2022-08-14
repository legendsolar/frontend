import {useAuth} from 'hooks/use_auth';
import {Navigate, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import LoadingView from 'views/loading_view';
import {useUser} from 'hooks/use_user';
import {UserStatus} from 'schema/schema_gen_types';
import {ROUTES} from 'routes/routes';
import ErrorPage from 'pages/error_page';

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

    // TODO would be ideal to only fetch this if user is auth
    const {loading, error, status, refetch} = useGetUserStatus();

    console.log({status});

    if (auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    if (loading) {
        return <LoadingView></LoadingView>;
    }

    if (error && !(error?.networkError?.type === 'AuthenticationError')) {
        return <ErrorPage></ErrorPage>;
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

    if (verifiedUserRequired && !status?.verified) {
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

    if (unverifiedUserRequired && status?.verified) {
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
