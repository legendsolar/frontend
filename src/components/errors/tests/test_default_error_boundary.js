import DefaultErrorBoundary from '../default_error_boundary';

const TestDefaultErrorBoundary = () => {
    const obj = {};
    return (
        <DefaultErrorBoundary>
            <div>{obj.doesNotExist}</div>
        </DefaultErrorBoundary>
    );
};

export default TestDefaultErrorBoundary;
