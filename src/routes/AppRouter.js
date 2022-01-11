import { useRoutes } from "hookrouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth, useAuth } from "../hooks/use_auth";
import { navigate } from "hookrouter/dist/router";
import { useRedirect } from "hookrouter";
import PortfolioView from "../pages/portfolio_view";
import SignInView from "../pages/sign_in_view";

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;
    const isAuthenticating = auth.isAuthenticating;

    // TODO not sure if this is legit?
    useRedirect(user ? "/signIn" : "/", user ? "/" : "/signIn");

    const routes = {
        "/": () => <PortfolioView />,
        "/signIn": () => <SignInView />,
    };

    const routeResult = useRoutes(routes);

    if (isAuthenticating) {
        return <div>Loading...</div>;
    } else {
        return routeResult || <div>Not found</div>;
    }
}

export default AppRouter;
