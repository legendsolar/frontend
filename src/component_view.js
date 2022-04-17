import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy} from 'react';
import {nanoid} from 'nanoid';
import {select} from 'd3';

const basePaths = [
    {
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
        name: 'buttons',
        tests: [
            {
                name: 'test_google_icon_button',
            },
        ],
    },

    {
        name: 'errors',
        tests: [
            {
                name: 'test_default_error_boundary',
            },
            {
                name: 'test_error_component',
            },
        ],
    },

    {
        name: 'gauges',
        tests: [
            {
                name: 'test_cumulative_impact',
            },
            {
                name: 'test_metric_gauge',
            },
        ],
    },

    {
        name: 'icons',
        tests: [
            {
                name: 'test_document_icon',
            },
            {
                name: 'test_google_icon',
            },
            {
                name: 'test_legends_solar_logo',
            },
            {
                name: 'test_panels_svg',
            },
        ],
    },

    {
        name: 'inputs',
        tests: [
            {
                name: 'test_multiselect',
            },
            {
                name: 'test_checkbox_list',
            },
        ],
    },

    {
        name: 'invest',
        tests: [
            {
                name: 'test_document_component',
            },
            {
                name: 'test_offering',
            },
            {
                name: 'test_precommit_letter_component',
            },
        ],
    },

    {
        name: 'pills',
        tests: [
            {
                name: 'test_live_pill',
            },
        ],
    },

    {
        name: 'plaid',
        tests: [
            {
                name: 'test_plaid_link',
            },
        ],
    },

    {
        name: 'transfers',
        tests: [
            {
                name: 'test_account_list',
            },
            {
                name: 'test_create_transfer',
            },
            {
                name: 'test_transaction',
            },
        ],
    },
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
    const [expanded, setExpanded] = useState(true);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedBase, setSelectedBase] = useState(basePaths[0]);

    useEffect(() => {
        async function loadViews() {
            const componentPromises = basePaths
                .filter((base) => base.name === selectedComponent?.base)
                .map(async (base, idx) => {
                    const test = base.tests.filter(
                        (test) => test.name === selectedComponent?.name,
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

    const baseSelection = (
        <div>
            <p>type</p>
            <select
                name={'baseSelection'}
                value={selectedBase.name}
                onChange={(event) => {
                    const newBase = basePaths.filter(
                        (base) => base.name === event.target.value,
                    )[0];
                    setSelectedBase(newBase);
                    setSelectedComponent({
                        base: newBase.name,
                        name: newBase.tests[0].name,
                    });
                }}
            >
                {basePaths.map((base) => (
                    <option key={nanoid()} value={base.name}>
                        {base.name}
                    </option>
                ))}
            </select>
        </div>
    );

    const testSelection = (
        <div>
            <div>test component</div>
            <select
                name={selectedBase.name}
                key={nanoid()}
                value={selectedComponent?.name ? selectedComponent.name : ''}
                onChange={(event) =>
                    setSelectedComponent({
                        base: selectedBase.name,
                        name: event.target.value,
                    })
                }
            >
                {selectedBase.tests &&
                    selectedBase.tests.map((test) => (
                        <option key={nanoid()} value={test.name}>
                            {test.name}
                        </option>
                    ))}
            </select>
        </div>
    );

    const expandedView = (
        <div key={nanoid()}>
            <h4>legends interal component testing tool</h4>
            <a href="https://github.com/legendsolar/frontend/blob/main/tools.md">
                info
            </a>
            {baseSelection}
            {testSelection}
            <p>
                {selectedComponent
                    ? `selected component:${selectedComponent.base}/${selectedComponent.name}`
                    : 'none selected'}
            </p>
            <button onClick={() => setExpanded(false)}>hide header</button>
            <hr></hr>
        </div>
    );

    const hiddenView = (
        <div
            key={nanoid()}
            style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                zIndex: 1000,
            }}
        >
            <button onClick={() => setExpanded(true)}>show header</button>
        </div>
    );

    return (
        <div>
            {expanded ? expandedView : hiddenView}
            <React.Suspense fallback="Loading component... (components with images may take a few seconds)">
                <ErrorBoundary>
                    <div className="container">{views}</div>
                </ErrorBoundary>
            </React.Suspense>
        </div>
    );
};

export default ComponentView;
