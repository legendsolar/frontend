import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy} from 'react';
import {nanoid} from 'nanoid';
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
            {
                name: 'test',
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

    useEffect(() => {
        async function loadViews() {
            const componentPromises = basePaths
                .filter((base) => base.name === selectedComponent.base)
                .map(async (base, idx) => {
                    const test = base.tests.filter(
                        (test) => test.name === selectedComponent.name,
                    )[0];
                    if (test) {
                        const path = `./components/${base.name}/tests/${test.name}`;
                        const Component = await importComponent(path);
                        return <Component key={nanoid()} />;
                    }

                    return null;
                });

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [basePaths, selectedComponent]);

    const renderedComponentOptionList = basePaths.map((base) => (
        <div>
            <p>{base.name}</p>
            <select
                name={base.name}
                key={base.name}
                value={
                    base.name === selectedComponent?.base
                        ? selectedComponent?.name
                        : ''
                }
                onChange={(event) =>
                    setSelectedComponent({
                        base: base.name,
                        name: event.target.value,
                    })
                }
            >
                {base.tests &&
                    base.tests.map((test) => (
                        <option value={test.name}>{test.name}</option>
                    ))}
                <option>{null}</option>
            </select>
        </div>
    ));

    return (
        <div>
            {renderedComponentOptionList}
            <p>
                {selectedComponent
                    ? `selected component:${selectedComponent.base}/${selectedComponent.name}`
                    : 'none selected'}
            </p>
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
