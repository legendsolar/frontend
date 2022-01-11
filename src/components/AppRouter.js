import { useRoutes } from "hookrouter";
import SignIn from "./SignIn";
import UserDashboard from "./UserDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth, useAuth } from "../hooks/useAuth";

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;
    const isAuthenticating = auth.isAuthenticating;

    const routes = {
        "/": () => (user ? <UserDashboard /> : <SignIn />),
        "/signIn": () => <SignIn />,
        "/userhome": () => <UserDashboard />,
    };
    const routeResult = useRoutes(routes);

    if (isAuthenticating) {
        return <div>Loading...</div>;
    } else {
        return routeResult || <div>Not found</div>;
    }
}

export default AppRouter;
