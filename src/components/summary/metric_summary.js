import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Item } from "@mui/material";

function MetricSummary(props) {
    const title = "Performace";

    const metrics = [
        { name: "Up-Time", value: "99%" },
        { name: "Performance Ratio", value: "14.3" },
        { name: "Y2D KWM Generated", value: "483" },
    ];
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="dashboardHeader">{title}</Typography>
            <Grid container sx={{ width: "100%" }}>
                {metrics.map((metric, i) => (
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        sx={{ p: 1 }}
                    >
                        <Typography variant="metricName">
                            {metric.name}
                        </Typography>
                        <Typography variant="metricValue">
                            {metric.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default MetricSummary;
