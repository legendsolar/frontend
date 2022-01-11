import { useAuth } from "../hooks/use_auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { authed } = useAuth();

    return authed === true ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
