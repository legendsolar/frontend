import {useAuth} from 'hooks/use_auth';
import {Navigate, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import LoadingView from 'views/loading_view';
import {useUser} from 'hooks/use_user';
import {UserStatus} from 'schema/schema_gen_types';
import {ROUTES} from './app_router';
import ErrorPage from 'pages/error_page';

interface ProtectedRouteProps {
    children: JSX.Element;
    disallowedUserStates?: Array<UserStatus>;
    disallowedRedirectPath?: ROUTES;
    requiredUserStates?: Array<UserStatus>;
    requiredRedirectPath?: ROUTES;
}

const ProtectedRoute = ({
    children,
    disallowedUserStates,
    disallowedRedirectPath = ROUTES.USER_HOME,
    requiredUserStates,
    requiredRedirectPath = ROUTES.CREATE_ACCOUNT,
}: ProtectedRouteProps) => {
    const auth = useAuth();
    const location = useLocation();

    const {useGetUserStatus} = useUser();

    // TODO would be ideal to only fetch this if user is auth
    const {loading, error, status, refetch} = useGetUserStatus();

    if (auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    if (loading) {
        return <LoadingView></LoadingView>;
    }

    console.log(auth.user);

    if (error && !(error?.networkError?.type === 'AuthenticationError')) {
        return <ErrorPage></ErrorPage>;
    }

    if (
        status &&
        status !== 'NO_ACCOUNT' &&
        disallowedUserStates &&
        disallowedUserStates.indexOf(status) > -1
    ) {
        return (
            <Navigate
                to={disallowedRedirectPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (
        !auth.user ||
        (status &&
            status !== 'NO_ACCOUNT' &&
            requiredUserStates &&
            requiredUserStates.indexOf(status) === -1)
    ) {
        return (
            <Navigate
                to={requiredRedirectPath}
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
