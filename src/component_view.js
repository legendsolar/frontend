import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy} from 'react';

const components = [
    {
        path: './components/basics/test',
        name: 'BasicTest',
    },
    {
        path: './tests/transaction_test',
        name: 'TransferComponent',
    },
    {
        path: './tests/metric_gauge_test',
        name: 'MetricGauge',
    },
    {
        path: './tests/account_list_test',
        name: 'AccountList',
    },
    {
        path: './tests/test_create_transaction',
        name: 'TestCreateTransaction',
    },
    {
        path: './tests/test_multiselect',
        name: 'TestMultiselect',
    },
    {
        path: './tests/test_sign_up_option',
        name: 'TestSignUpOption',
    },
];

const importView = (subreddit) =>
    lazy(() =>
        import(`${subreddit}`).catch((e) => {
            console.log(e);
            return import(`./views/error`);
        }),
    );

function ComponentView() {
    const [views, setViews] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(
        components[0].name,
    );

    useEffect(() => {
        async function loadViews() {
            const componentPromises = components
                .filter((component) => component.name === selectedComponent)
                .map(async (component, idx) => {
                    const Component = await importView(component.path);
                    return <Component key={component.name} />;
                });

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [components, selectedComponent]);

    const renderedComponents = components.map((component) => (
        <option>{component.name}</option>
    ));

    return (
        <div>
            <select
                value={selectedComponent}
                onChange={(event) => setSelectedComponent(event.target.value)}
            >
                {renderedComponents}
            </select>
            <p>selected component: {selectedComponent}</p>
            <hr></hr>
            <React.Suspense fallback="Loading component... (components with images may take a few seconds)">
                <ErrorBoundary>
                    <div className="container">{views}</div>
                </ErrorBoundary>
            </React.Suspense>
        </div>
    );
}

export default ComponentView;
