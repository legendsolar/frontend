import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";

import { useState } from "react";
const CumulativeImpact = ({ cumulativeData, unitOpts }) => {
    const [historyState, setHistoryState] = useState("week");

    return (
        <Paper variant={"container"} sx={{ width: 400, height: 288 }}>
            <Stack
                justifyContent="space-between"
                spacing={1}
                sx={{ height: "100%" }}
            >
                <Typography variant="smallHeadline">
                    {unitOpts.title}
                </Typography>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack>
                        <Typography variant="label" align="center">
                            AVG
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                            -
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography
                            variant="headline1"
                            sx={{
                                color: unitOpts.strokeColor,
                            }}
                            align="center"
                        >
                            {`${cumulativeData[historyState].toFixed(0)}`}
                        </Typography>

                        <Typography variant="body1" align="center">
                            {unitOpts.unit}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography align="center" variant="label">
                            BEST
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                            -
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-evenly"
                >
                    <Chip
                        label={"Y2D"}
                        onClick={() => setHistoryState("year")}
                        clickable={true}
                        variant={historyState == "year" ? "selected" : "light"}
                    ></Chip>

                    <Chip
                        label={"Month to Date"}
                        onClick={() => setHistoryState("month")}
                        clickable={true}
                        variant={historyState == "month" ? "selected" : "light"}
                    ></Chip>

                    <Chip
                        label={"W2D"}
                        onClick={() => setHistoryState("week")}
                        clickable={true}
                        variant={historyState == "week" ? "selected" : "light"}
                    ></Chip>

                    <Chip
                        label={"24H"}
                        onClick={() => setHistoryState("day")}
                        clickable={true}
                        variant={historyState == "day" ? "selected" : "light"}
                    ></Chip>
                </Stack>
            </Stack>
        </Paper>
    );
};

CumulativeImpact.propTypes = {
    cumulativeData: PropTypes.shape({
        day: PropTypes.number.isRequired,
        week: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
    }).isRequired,
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }).isRequired,
};

export default CumulativeImpact;
