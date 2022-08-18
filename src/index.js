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

import {signOut} from 'firebase/auth';

import {createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getAuth} from 'firebase/auth';
import {throwAuthenticationError, throwSystemError} from 'utils/errors.js';
import {v4} from 'uuid';
import {onError} from '@apollo/client/link/error';

if (appSettings.sentry.enabled)
    Sentry.init({
        dsn: 'https://befcf88557b54a7c939b8fdacec0cc62@o1127533.ingest.sentry.io/6169541',
        integrations: [
            new Integrations.BrowserTracing(),
            new Sentry.Integrations.UserAgent(),
            new Sentry.Integrations.TryCatch(),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: appSettings.sentry.sampleRate,
        debug: appSettings.sentry.debug,
        attachStacktrace: true,
        autoSessionTracking: true,
    });

if (appSettings.fullStory.enabled) {
    FullStory.init({
        orgId: '18J59K',
    });
}

if (appSettings.logRocket.enabled) {
    LogRocket.init('d6ndfk/legends-app');
}

smoothscroll.polyfill();

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPH_QL_SERVER_URL,
});

const sessionId = v4();

const getUserSessionId = () => {
    return sessionId;
};

const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists

    const user = getAuth().currentUser;

    if (!user) {
        throwAuthenticationError({
            message: 'Cannot make GraphQL request, user not authenticated',
        });
    }

    try {
        const token = await user.getIdToken();

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
                ['session-id']: getUserSessionId(),
            },
        };
    } catch (e) {
        signOut(getAuth());
        throw e;
    }
});

// TODO is this causing capcha errors?
const errorHandler = onError(({networkError, graphQLErrors}) => {
    console.log('here');
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
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
