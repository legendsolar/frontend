import { useRoutes } from "hookrouter";
import SignIn from "./SignIn";
import UserHome from "./UserHome";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProvideAuth, useAuth } from "../hooks/useAuth";

const routes = {
    "/": () => <UserHome />,
    "/signIn": () => <SignIn />,
};

function AppRouter() {
    const auth = useAuth();
    const user = auth.user;

    const routes = {
        "/": () => (user ? <UserHome /> : <SignIn />),
        "/signIn": () => <SignIn />,
        "/userhome": () => <UserHome />,
    };
    const routeResult = useRoutes(routes);

    return routeResult || <div>Not found</div>;
}

export default AppRouter;
