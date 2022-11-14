import ErrorComponent from './error_component';
import {ErrorBoundary} from '@sentry/react';

export const DefaultErrorBoundary = ({children}: {children: JSX.Element}) => {
    return (
        <ErrorBoundary fallback={<ErrorComponent></ErrorComponent>}>
            {children}
        </ErrorBoundary>
    );
};
