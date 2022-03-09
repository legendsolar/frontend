import { useAuth } from "../hooks/use_auth";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoadingView from "../views/loading_view";

function ProtectedRoute({ children, disallowedUserStates }) {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    if (disallowedUserStates) {
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
}

export default ProtectedRoute;
