import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as FullStory from "@fullstory/browser";
import LogRocket from "logrocket";

import appSettings from "./app_settings";

import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

if (appSettings.sentry.enabled)
    Sentry.init({
        dsn: "https://befcf88557b54a7c939b8fdacec0cc62@o1127533.ingest.sentry.io/6169541",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: appSettings.sentry.sampleRate,
    });

if (appSettings.fullStory.enabled) {
    FullStory.init({
        orgId: "18J59K",
    });
}

if (appSettings.logRocket.enabled) {
    LogRocket.init("d6ndfk/legends-alpha");
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
