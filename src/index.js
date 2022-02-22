import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as FullStory from "@fullstory/browser";

import appSettings from "./app_settings";

/* Custom Fonts */
import "typeface-be-vietnam";

if (appSettings.sentryEnabled)
    Sentry.init({
        dsn: "https://befcf88557b54a7c939b8fdacec0cc62@o1127533.ingest.sentry.io/6169541",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

if (appSettings.fullStoryEnabled) {
    FullStory.init({
        orgId: "18J59K",
    });
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
