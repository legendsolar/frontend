import { ProvideAuth, useAuth } from "./hooks/use_auth";
import AppRouter from "./routes/AppRouter";

function App() {
    return (
        <ProvideAuth>
            <AppRouter></AppRouter>;
        </ProvideAuth>
    );
}

export default App;
