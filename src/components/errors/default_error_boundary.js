import ErrorComponent from "./error_component";
import { ErrorBoundary } from "@sentry/react";

const DefaultErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary fallback={<ErrorComponent></ErrorComponent>}>
            {children}
        </ErrorBoundary>
    );
};

export default DefaultErrorBoundary;
