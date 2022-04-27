import {useAuth} from 'hooks/use_auth';
import {Navigate} from 'react-router-dom';
import LoadingView from 'views/loading_view';

function UnprotectedRoute({children}) {
    const auth = useAuth();

    if (auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    return !auth.user ? children : <Navigate to="/" replace />;
}

export default UnprotectedRoute;
