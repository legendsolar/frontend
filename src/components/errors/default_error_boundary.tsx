import ErrorComponent from 'components/errors/error_component';
import {ErrorBoundary} from '@sentry/react';

const DefaultErrorBoundary = ({children}: {children: JSX.Element}) => {
    return (
        <ErrorBoundary fallback={<ErrorComponent></ErrorComponent>}>
            {children}
        </ErrorBoundary>
    );
};

export default DefaultErrorBoundary;
