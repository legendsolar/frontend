import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import * as FullStory from '@fullstory/browser';
import LogRocket from 'logrocket';

import appSettings from 'app_settings';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

console.log('loading: ' + process.env.REACT_APP_BUILD_TARGET);

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

importBuildTarget().then(({default: Environment}) =>
    ReactDOM.render(
        <React.StrictMode>
            <Environment />
        </React.StrictMode>,
        document.getElementById('root'),
    ),
);
