import React, { useState, useEffect, lazy } from "react";
import { Typography, Box, Grid } from "@mui/material";

import { DocumentIcon } from "../components/icons/document_icon";
import { ErrorGauge } from "../components/gauges/live_metric_gauge";

const componentViewJson = [
    {
        key: "errorGauge1",
        path: "../components/gauges/live_metric_gauge.js",
        props: {},
    },
];

const loadComponent = async (path) => {
    return await lazy(() => import("../components/user_debug_paper"));
};

const ComponentView = () => {
    const paths = [`${__dirname}/components/user_debug_paper`];

    const [views, setViews] = useState([]);

    useEffect(() => {
        async function loadViews() {
            const componentPromises = paths.map(async (path) => {
                const View = await loadComponent(path).catch((error) => {
                    console.log(error);
                });
                return <View key={path} />;
            });

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [paths]);

    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <React.Suspense fallback="loading">{views}</React.Suspense>
        </Grid>
    );
};

export default ComponentView;
