import {useAuth} from 'hooks/use_auth';
import {Navigate} from 'react-router-dom';
import LoadingView from 'views/loading_view';
import {ROUTES} from './app_router';

interface UnprotectedRouteProps {
    children: JSX.Element;
}

const UnprotectedRoute = ({children}: UnprotectedRouteProps) => {
    const auth = useAuth();

    if (auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    return !auth.user ? children : <Navigate to={ROUTES.USER_HOME} replace />;
};

export default UnprotectedRoute;
