import { useAuth } from "../hooks/use_auth";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isAuthenticating) {
        console.log("is authenticating");
        return <></>;
    }

    console.log("auth state");
    console.log(auth);
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
