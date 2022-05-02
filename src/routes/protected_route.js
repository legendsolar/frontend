import {useAuth} from 'hooks/use_auth';
import {useEffect, useLayoutEffect, useMemo} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import LoadingView from 'views/loading_view';
import PropTypes from 'prop-types';
import ErrorPage from 'pages/error_page';
import {useUser} from 'hooks/use_user';

const ProtectedRoute = ({
    children,
    disallowedUserStates,
    disallowedPath,
    requiredUserStates,
    requiredPath,
}) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const {useGetUserStatus} = useUser();

    const {loading, error, status} = useGetUserStatus();

    if (
        status &&
        status !== 'NO_ACCOUNT' &&
        disallowedUserStates &&
        disallowedUserStates.indexOf(status) > -1
    ) {
        return (
            <Navigate
                to={disallowedPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (
        status &&
        status !== 'NO_ACCOUNT' &&
        requiredUserStates &&
        requiredUserStates.indexOf(status) === -1
    ) {
        return (
            <Navigate
                to={requiredPath}
                replace
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    if (auth.isAuthenticating || loading) {
        return <LoadingView></LoadingView>;
    }

    if (error) {
        return <ErrorPage></ErrorPage>;
    }

    return auth.user ? (
        children
    ) : (
        <Navigate
            to="/signin"
            replace
            state={{
                path: location.pathname,
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    disallowedUserStates: PropTypes.array,
    disallowedPath: PropTypes.string,
    requiredUserStates: PropTypes.array,
    requiredPath: PropTypes.string,
};

ProtectedRoute.defaultProps = {
    disallowedUserStates: null,
    disallowedPath: '/',
    requiredUserStates: null,
    requiredPath: '/',
};

export default ProtectedRoute;
