import { useAuth } from "../hooks/use_auth";
import { Navigate } from "react-router-dom";

function UnprotectedRoute({ children }) {
    const auth = useAuth();

    console.log("unprotected route");
    console.log(auth.user);

    return !auth.user ? children : <Navigate to="/" replace />;
}

export default UnprotectedRoute;
