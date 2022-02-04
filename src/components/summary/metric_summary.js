import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import MetricList from "./metric_list";

function MetricSummary(props) {
    const title = "Performace";

    return (
        <Paper sx={{ p: 2 }} variant="container">
            <Typography variant="dashboardHeader">{title}</Typography>
            <MetricList
                valuePairs={[
                    { metric: "Up Time", value: "98%" },
                    { metric: "Performace Ration", value: "12" },
                    { metric: "Y2D KWH Generated", value: "235" },
                ]}
            ></MetricList>
        </Paper>
    );
}

export default MetricSummary;
