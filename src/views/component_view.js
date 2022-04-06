import React, { useState, useEffect, lazy } from "react";
import { Typography, Box, Grid } from "@mui/material";

import { DocumentIcon } from "../components/icons/document_icon";
import { ErrorGauge } from "../components/gauges/live_metric_gauge";
import ErrorComponent from "../components/errors/error_component";

const subredditsToShow = ["./c", "./d", "./e"];

const importView = (subreddit) =>
    lazy(() => import(`${subreddit}`).catch(() => import(`./error`)));

function ComponentView() {
    const [views, setViews] = useState([]);

    useEffect(() => {
        async function loadViews() {
            const componentPromises = subredditsToShow.map(
                async (subreddit) => {
                    const Component = await importView(subreddit);
                    return <Component key={subreddit} />;
                }
            );

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [subredditsToShow]);

    return (
        <React.Suspense fallback="Loading views...">
            <div className="container">{views}</div>
        </React.Suspense>
    );
}

export default ComponentView;
