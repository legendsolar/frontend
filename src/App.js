import AppRouter from "./components/AppRouter";
import { ProvideAuth, useAuth } from "./hooks/useAuth";

function App() {
    return (
        <ProvideAuth>
            <AppRouter></AppRouter>;
        </ProvideAuth>
    );
}

export default App;
