import {ErrorBoundary} from '@sentry/react';
import React, {useState, useEffect, lazy, useCallback} from 'react';
import {nanoid} from 'nanoid';
import qs from 'query-string';
import DefaultComponent from 'components/utils/default_component';
import {Stack, Typography} from '@mui/material';
import DualPaneView from 'views/dual_pane_view';
import PersonPanelPinkSVG from 'assets/images/panel_person_pink.svg';
import DefaultView from 'views/default_view';
import FullPageView from 'views/full_page_view';
import NavBar from 'components/utils/nav_bar';
import {UserStatus} from 'schema/schema_gen_types';

const basePaths = [
    {
        name: 'basics',
        type: 'components',
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
        type: 'components',
        tests: [
            {
                name: 'test_google_icon_button',
            },
            {
                name: 'test_back_button',
            },
        ],
    },
    {
        name: 'documents',
        type: 'components',
        tests: [
            {
                name: 'test_document_data_grid',
            },
        ],
    },

    {
        name: 'errors',
        type: 'components',
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
        type: 'components',
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
        type: 'components',
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
        type: 'components',
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
        type: 'components',
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
            {
                name: 'test_offering_list_component',
            },
        ],
    },

    {
        name: 'map',
        type: 'components',
        tests: [
            {
                name: 'test_basic_map_component',
            },
            {
                name: 'test_basic_globe_component',
            },
        ],
    },

    {
        name: 'pills',
        type: 'components',
        tests: [
            {
                name: 'test_live_pill',
            },
        ],
    },

    {
        name: 'placeholders',
        type: 'components',
        tests: [
            {
                name: 'test_document_placeholder',
            },

            {
                name: 'test_portfolio_placeholder',
            },

            {
                name: 'test_transfer_placeholder',
            },
        ],
    },

    {
        name: 'transfers',
        type: 'components',
        tests: [
            {
                name: 'test_account_list',
            },
            {
                name: 'test_create_transfer',
            },
            {
                name: 'test_transfer_component',
            },
            {
                name: 'test_transfer_grid',
            },
            {
                name: 'test_transfer_data_grid',
            },
        ],
    },

    {
        name: 'signup',
        type: 'components',
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
            {
                name: 'test_complete_step_component',
            },
            {
                name: 'test_sign_up_process_bar_component',
            },
        ],
    },

    {
        name: 'tests',
        type: 'components',
        tests: [
            {
                name: 'test_graph_ql_test',
            },
        ],
    },

    {
        name: 'user',
        type: 'components',
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
        type: 'components',
        tests: [
            {
                name: 'test_nav_bar',
            },
        ],
    },
    {
        name: 'views',
        type: 'views',
        tests: [
            {
                name: 'test_dual_pane_view',
            },
            {
                name: 'test_verify_process_view',
            },
        ],
    },
    {
        name: 'content',
        type: 'content',
        tests: [
            {
                name: 'test_account_create_info_content',
            },
            {
                name: 'test_create_account_content',
            },
            {
                name: 'test_complete_account_content',
            },
            {
                name: 'test_verify_email_content',
            },
            {
                name: 'test_verify_mfa_content',
            },
            {
                name: 'test_verify_accreditation_content',
            },
            {
                name: 'test_transfer_grid_content',
            },
            {
                name: 'test_document_grid_content',
            },
            {
                name: 'test_create_wallet_content',
            },
            {
                name: 'test_portfolio_content',
            },
            {
                name: 'test_discovery_content',
            },
        ],
    },
    {
        name: 'worm',
        type: 'components',
        tests: [
            {
                name: 'test_prod_worm',
            },
        ],
    },
];

const viewOptions = [
    {
        name: 'None',
        render: (componentUnderTest) => <div>{componentUnderTest}</div>,
    },
    {
        name: 'DualPaneView',
        render: (componentUnderTest) => {
            return (
                <DualPaneView
                    leftPane={componentUnderTest}
                    rightPane={<img src={PersonPanelPinkSVG}></img>}
                ></DualPaneView>
            );
        },
    },
    {
        name: 'DefaultView',
        render: (componentUnderTest) => {
            return (
                <DefaultView
                    authenticated={true}
                    navBar={
                        <NavBar
                            userIsAuthenticated={true}
                            userStatus={UserStatus.IdentityVerified}
                            walletBalance={100}
                        ></NavBar>
                    }
                >
                    {componentUnderTest}
                </DefaultView>
            );
        },
    },
    {
        name: 'FullPageView',
        render: (componentUnderTest) => {
            return (
                <FullPageView
                    authenticated={true}
                    navBar={
                        <NavBar
                            userIsAuthenticated={true}
                            userStatus={UserStatus.IdentityVerified}
                            walletBalance={100}
                        ></NavBar>
                    }
                >
                    {componentUnderTest}
                </FullPageView>
            );
        },
    },
];

const importComponent = (path) =>
    lazy(() =>
        import(`${path}`).catch((e) => {
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
    const [components, setComponents] = useState([]);
    const [expanded, setExpanded] = useQueryString('expanded');
    const [stack, setStack] = useState(true);

    const [baseName, setBaseName] = useQueryString('base');
    const [componentName, setComponentName] = useQueryString('component');
    const [viewName, setViewName] = useQueryString('view');

    const selectedBase = basePaths.filter((base) => base.name === baseName)[0];

    const view = viewOptions.filter((view) => view.name === viewName)[0];

    useEffect(() => {
        if (!baseName) {
            setBaseName(basePaths[0].name);
        }

        if (!componentName) {
            setComponentName(basePaths[0].tests[0].name);
        }

        if (!viewName) {
            setViewName(viewOptions[0].name);
        }

        setExpanded(false);
    }, []);

    const selectedComponent = {
        base: baseName,
        name: componentName,
    };

    useEffect(() => {
        async function loadComponents() {
            const componentPromises = basePaths
                .filter((base) => base.name === selectedComponent?.base)
                .map(async (base, idx) => {
                    const test = base.tests.filter(
                        (test) => test.name === selectedComponent?.name,
                    )[0];
                    if (test) {
                        const path =
                            base.type === 'components'
                                ? `./${base.type}/${base.name}/tests/${test.name}`
                                : `./${base.type}/tests/${test.name}`;
                        console.log(path);
                        const Component = await importComponent(path);
                        return <Component key={nanoid()} />;
                    }

                    return null;
                });

            Promise.all(componentPromises).then(setComponents);
        }

        loadComponents();
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

    const viewSelection = (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>view type: </div>
            <select
                name={'viewSelection'}
                value={view?.name ? view?.name : 'None'}
                onChange={(event) => {
                    if (event.target.value === 'None') {
                        setViewName(null);
                        return;
                    }
                    const newView = viewOptions.filter(
                        (view) => view.name === event.target.value,
                    )[0];
                    setViewName(newView.name);
                }}
            >
                {viewOptions.map((v) => (
                    <option key={nanoid()} value={v.name}>
                        {v.name}
                    </option>
                ))}

                <option>None</option>
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
            {viewSelection}
            <p>
                {selectedComponent
                    ? `selected ${selectedComponent.base}/${selectedComponent.name}`
                    : 'none selected'}
            </p>
            <button onClick={() => setExpanded(false)}>hide header</button>
            <button onClick={() => setStack(!stack)}>
                toggle stack surround
            </button>
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
            <button onClick={() => setExpanded(true)}>show tool</button>
        </div>
    );
    if (!view) {
        return (
            <div>
                {expanded ? expandedView : hiddenView}
                <React.Suspense fallback="Loading component... (components with images may take a few seconds)">
                    <ErrorBoundary>
                        <div className="container">
                            {stack && <Stack>{components}</Stack>}
                            {!stack && components}
                        </div>
                    </ErrorBoundary>
                </React.Suspense>
            </div>
        );
    }

    if (view) {
        return (
            <div>
                {expanded ? expandedView : hiddenView}
                <React.Suspense fallback="Loading component... (components with images may take a few seconds)">
                    <ErrorBoundary>{view.render(components)}</ErrorBoundary>
                </React.Suspense>
            </div>
        );
    }
};
export default ComponentView;
