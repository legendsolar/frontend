import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy} from 'react';
import nanoid from 'nanoid';
import {select} from 'd3';

const basePaths = [
    {
        // path: './components/basics',
        name: 'basics',
        tests: [
            {
                name: 'test_content_divider',
            },
            {
                name: 'test_divider',
            },
        ],
    },
    {
        // path: './components/basics',
        name: 'buttons',
        tests: [
            {
                name: 'test_google_icon_button',
            },
        ],
    },
    // {
    //     path: './components/buttons',
    //     name: 'buttons',
    // },
    // {
    //     path: './components/buttons',
    //     name: 'buttons',
    // },
    // {
    //     path: './components/errors',
    //     name: 'errors',
    // },
    // {
    //     path: './components/gauges',
    //     name: 'gauges',
    // },
    // {
    //     path: './components/icons',
    //     name: 'icons',
    // },
    // {
    //     path: './components/invest',
    //     name: 'invest',
    // },
    // {
    //     path: './components/pills',
    //     name: 'plaid',
    // },
    // {
    //     path: './components/signup',
    //     name: 'signup',
    // },
    // {
    //     path: './components/summary',
    //     name: 'summary',
    // },
    // {
    //     path: './components/transfers',
    //     name: 'transfers',
    // },
    // {
    //     path: './components/user',
    //     name: 'user',
    // },
    // {
    //     path: './components/utils',
    //     name: 'utils',
    // },
    // {
    //     path: './components/weather',
    //     name: 'weather',
    // },
    // {
    //     path: './components/worm',
    //     name: 'worm',
    // },
];

const importComponent = (path) =>
    lazy(() =>
        import(`${path}`).catch((e) => {
            console.log(e);
            return import(`./views/error`);
        }),
    );

const ComponentView = () => {
    const [views, setViews] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);

    // useEffect(() => {
    //     async function loadViews() {
    //         const componentPromises = components
    //             .filter((component) => component.name === selectedComponent)
    //             .map(async (component, idx) => {
    //                 const Component = await importComponent(component.path);
    //                 return <Component key={nanoid()} />;
    //             });

    //         Promise.all(componentPromises).then(setViews);
    //     }

    //     loadViews();
    // }, [components, selectedComponent]);

    const renderedComponentOptionList = basePaths.map((base) => (
        <div>
            <p>{base.name}</p>
            <select
                name={base.name}
                key={base.name}
                value={selectedComponent}
                onChange={(event) => setSelectedComponent(event.target.value)}
                onSelect={(event) => setSelectedComponent(event.target.value)}
            >
                {base.tests &&
                    base.tests.map((test) => <option>{test.name}</option>)}
                <option>{null}</option>
            </select>
        </div>
    ));

    return (
        <div>
            {renderedComponentOptionList}
            <p>selected component: {selectedComponent}</p>
            <hr></hr>
            <React.Suspense fallback="Loading component... (components with images may take a few seconds)">
                <ErrorBoundary>
                    <div className="container">{views}</div>
                </ErrorBoundary>
            </React.Suspense>
        </div>
    );
};

export default ComponentView;
