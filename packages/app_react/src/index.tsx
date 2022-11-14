import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import * as FullStory from '@fullstory/browser';
import LogRocket from 'logrocket';
import posthog from 'posthog-js';

import appSettings from './app_settings';
import smoothscroll from 'smoothscroll-polyfill';
import {ApolloProvider} from '@apollo/client';

import {client} from 'apollo_client_init';

if (appSettings.sentry.enabled)
    Sentry.init({
        dsn: 'https://befcf88557b54a7c939b8fdacec0cc62@o1127533.ingest.sentry.io/6169541',
        integrations: [
            new Integrations.BrowserTracing(),
            new Sentry.Integrations.UserAgent(),
            new Sentry.Integrations.TryCatch(),
        ],
        beforeSend(event, hint) {
            if (event.exception && appSettings.sentry.showReportDialogEnabled) {
                Sentry.showReportDialog({eventId: event.event_id});
            }
            return event;
        },
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: appSettings.sentry.sampleRate,
        debug: appSettings.sentry.debug,
        attachStacktrace: true,
        autoSessionTracking: true,
    });

if (appSettings.posthog.enabled) {
    posthog.init(appSettings.posthog.projectId, {
        api_host: 'https://app.posthog.com',
    });
}

if (appSettings.fullStory.enabled) {
    FullStory.init({
        orgId: '18J59K',
    });
}

if (appSettings.logRocket.enabled) {
    console.warn('log rocket enabled');
    LogRocket.init(appSettings.logRocket.projectId);
}

smoothscroll.polyfill();

const importBuildTarget = () => {
    if (process.env.REACT_APP_BUILD_TARGET === 'APP') {
        return import('./app.js');
    } else if (process.env.REACT_APP_BUILD_TARGET === 'TEST') {
        return import('./test.js');
    } else if (process.env.REACT_APP_BUILD_TARGET === 'COMPONENT_EXPORTER') {
        return import('./component_exporter.js');
    } else {
        return Promise.reject(
            new Error(
                'No such build target: ' + process.env.REACT_APP_BUILD_TARGET,
            ),
        );
    }
};

importBuildTarget().then(({default: Environment}) =>
    ReactDOM.render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <Environment />
            </ApolloProvider>
        </React.StrictMode>,
        document.getElementById(
            process.env?.REACT_APP_RENDER_DIV_ID
                ? process.env.REACT_APP_RENDER_DIV_ID
                : 'root',
        ),
    ),
);
