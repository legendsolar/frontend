import { useRoutes } from "hookrouter";
import SignIn from "./SignIn";
import UserDashboard from "./UserDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth, useAuth } from "../hooks/useAuth";
import { navigate } from "hookrouter/dist/router";
import { useRedirect } from "hookrouter";

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;
    const isAuthenticating = auth.isAuthenticating;

    // TODO not sure if this is legit?
    useRedirect(user ? "/signIn" : "/", user ? "/" : "/signIn");

    const routes = {
        "/": () => <UserDashboard />,
        "/signIn": () => <SignIn />,
    };

    const routeResult = useRoutes(routes);

    if (isAuthenticating) {
        return <div>Loading...</div>;
    } else {
        return routeResult || <div>Not found</div>;
    }
}

export default AppRouter;
