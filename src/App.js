import { ProvideAuth, useAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app-router";

function App() {
    return (
        <ProvideAuth>
            <AppRouter></AppRouter>;
        </ProvideAuth>
    );
}

export default App;
