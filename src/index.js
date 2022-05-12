import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import * as FullStory from '@fullstory/browser';
import LogRocket from 'logrocket';

import appSettings from 'app_settings';

import smoothscroll from 'smoothscroll-polyfill';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from '@apollo/client';

import {createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getAuth} from 'firebase/auth';

if (appSettings.sentry.enabled)
    Sentry.init({
        dsn: 'https://befcf88557b54a7c939b8fdacec0cc62@o1127533.ingest.sentry.io/6169541',
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: appSettings.sentry.sampleRate,
    });

if (appSettings.fullStory.enabled) {
    FullStory.init({
        orgId: '18J59K',
    });
}

if (appSettings.logRocket.enabled) {
    LogRocket.init('d6ndfk/legends-alpha');
}

smoothscroll.polyfill();

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPH_QL_SERVER_URL,
});

const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists

    const token = await getAuth().currentUser.getIdToken();

    const sessionUrl = LogRocket.sessionURL;

    const sessionId = sessionUrl
        ? new URL(sessionUrl).pathname.split('/').pop()
        : null;

    console.log({sessionId});

    console.log('token: ' + token);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
            sessionId: sessionId,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function importBuildTarget() {
    if (process.env.REACT_APP_BUILD_TARGET === 'APP') {
        return import('./app.js');
    } else if (process.env.REACT_APP_BUILD_TARGET === 'TEST') {
        return import('./test.js');
    } else {
        return Promise.reject(
            new Error(
                'No such build target: ' + process.env.REACT_APP_BUILD_TARGET,
            ),
        );
    }
}

importBuildTarget().then(({default: Environment}) =>
    ReactDOM.render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <Environment />
            </ApolloProvider>
        </React.StrictMode>,
        document.getElementById('root'),
    ),
);
