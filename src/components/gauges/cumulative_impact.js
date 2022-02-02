import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";

import { useState } from "react";
const CumulativeImpact = ({ cumulativeData, unitOpts }) => {
    const [historyState, setHistoryState] = useState("week");

    return (
        <Paper sx={{ p: 2, width: 400, height: 288 }}>
            <Stack
                justifyContent="space-between"
                spacing={1}
                sx={{ height: "100%" }}
            >
                <Typography variant="dashboardHeader" gutterBottom>
                    {unitOpts.title}
                </Typography>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            align="center"
                            gutterBottom
                        >
                            AVG
                        </Typography>

                        <Typography
                            sx={{ fontSize: 18 }}
                            color="text.primary"
                            align="center"
                        >
                            -
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography
                            variant="unitMainDisplay"
                            sx={{
                                color: unitOpts.strokeColor,
                            }}
                            gutterBottom
                            align="center"
                        >
                            {`${cumulativeData[historyState].toFixed(2)}`}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 12,
                                fontFamily: "Azeret Mono",
                            }}
                            color="text.primary"
                            align="center"
                        >
                            {unitOpts.unit}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                            align="center"
                        >
                            BEST
                        </Typography>

                        <Typography
                            sx={{ fontSize: 18 }}
                            color="text.primary"
                            align="center"
                        >
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
                        variant={historyState == "year" ? "filled" : "outlined"}
                        sx={{
                            textTransform: "uppercase",
                            fontFamily: "Azeret Mono",
                            fontSize: "9px",
                            lineHeight: "10.5px",
                        }}
                    ></Chip>

                    <Chip
                        label={"Month to Date"}
                        onClick={() => setHistoryState("month")}
                        clickable={true}
                        variant={
                            historyState == "month" ? "filled" : "outlined"
                        }
                        sx={{
                            textTransform: "uppercase",
                            fontFamily: "Azeret Mono",
                            fontSize: "9px",
                            lineHeight: "10.5px",
                        }}
                    ></Chip>

                    <Chip
                        label={"W2D"}
                        onClick={() => setHistoryState("week")}
                        clickable={true}
                        variant={historyState == "week" ? "filled" : "outlined"}
                        sx={{
                            textTransform: "uppercase",
                            fontFamily: "Azeret Mono",
                            fontSize: "9px",
                            lineHeight: "10.5px",
                        }}
                    ></Chip>

                    <Chip
                        label={"24H"}
                        onClick={() => setHistoryState("day")}
                        clickable={true}
                        variant={historyState == "day" ? "filled" : "outlined"}
                        sx={{
                            textTransform: "uppercase",
                            fontFamily: "Azeret Mono",
                            fontSize: "9px",
                            lineHeight: "10.5px",
                        }}
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
