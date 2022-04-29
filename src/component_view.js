import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy, useCallback} from 'react';
import {nanoid} from 'nanoid';
import qs from 'query-string';

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
            {
                name: 'test_transfer_data_grid',
            },
        ],
    },

    {
        name: 'signup',
        tests: [
            {
                name: 'test_sign_up_option',
            },
            {
                name: 'test_sign_up',
            },
            {
                name: 'test_create_dwolla_account',
            },
            {
                name: 'test_identity_verification_kba',
            },
            {
                name: 'test_identity_verification_document',
            },
            {
                name: 'test_complete_sign_up',
            },
        ],
    },

    {
        name: 'tests',
        tests: [
            {
                name: 'test_graph_ql_test',
            },
        ],
    },

    {
        name: 'user',
        tests: [
            {
                name: 'test_sign_in_component',
            },
            {
                name: 'test_modify_user_info',
            },
            {
                name: 'test_protected_user_info',
            },
        ],
    },

    {
        name: 'utils',
        tests: [
            {
                name: 'test_nav_bar',
            },
        ],
    },
];

const importComponent = (path) =>
    lazy(() =>
        import(`${path}`).catch((e) => {
            console.log(e);
            return import(`./views/error`);
        }),
    );

const setQueryStringWithoutPageReload = (qsValue) => {
    const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        qsValue;

    window.history.pushState({path: newurl}, '', newurl);
};

const setQueryStringValue = (
    key,
    value,
    queryString = window.location.search,
) => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({...values, [key]: value});
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
    key,
    queryString = window.location.search,
) => {
    const values = qs.parse(queryString);
    return values[key];
};

function useQueryString(key, initialValue) {
    const [value, setValue] = useState(
        getQueryStringValue(key) || initialValue,
    );
    const onSetValue = useCallback(
        (newValue) => {
            setValue(newValue);
            setQueryStringValue(key, newValue);
        },
        [key],
    );

    return [value, onSetValue];
}

const ComponentView = () => {
    const [views, setViews] = useState([]);
    const [expanded, setExpanded] = useState(true);

    const [baseName, setBaseName] = useQueryString('base');
    const [componentName, setComponentName] = useQueryString('component');

    const selectedBase = basePaths.filter((base) => base.name === baseName)[0];

    useEffect(() => {
        if (!baseName) {
            setBaseName(basePaths[0].name);
        }

        if (!componentName) {
            setComponentName(basePaths[0].tests[0].name);
        }
    }, []);

    const selectedComponent = {
        base: baseName,
        name: componentName,
    };

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
    }, [basePaths, baseName, componentName]);

    if (!baseName || !componentName) {
        return <></>;
    }

    const baseSelection = (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>component type: </div>
            <select
                name={'baseSelection'}
                value={baseName}
                onChange={(event) => {
                    const newBase = basePaths.filter(
                        (base) => base.name === event.target.value,
                    )[0];
                    setComponentName(newBase.tests[0].name);
                    setBaseName(newBase.name);
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
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>test component: </div>
            <select
                name={baseName}
                key={nanoid()}
                value={selectedComponent?.name ? selectedComponent.name : ''}
                onChange={(event) => {
                    setComponentName(event.target.value);
                    setBaseName(selectedBase.name);
                }}
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
