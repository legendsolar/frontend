import { useRoutes } from "hookrouter";
import SignIn from "./SignIn";
import UserHome from "./UserHome";
import "bootstrap/dist/css/bootstrap.min.css";

const routes = {
    "/": () => <UserHome />,
    "/signIn": () => <SignIn />,
};

function App() {
    const routeResult = useRoutes(routes);

    return routeResult || <div>Not found</div>;
}

export default App;
