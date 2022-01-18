import React from "react";
import { auth, database, firebaseApp } from "../../Firebase";
import { ref } from "firebase/database";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import { format } from "date-fns";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";
function LivePill(props) {
    return (
        <Grid
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
        >
            <Grid item>
                <Chip
                    size="small"
                    avatar={
                        <CircleIcon
                            fontSize="small"
                            color="primary"
                            sx={{
                                fontSize: "9px ",
                            }}
                        />
                    }
                    label={"Live"}
                    sx={{
                        textTransform: "uppercase",
                        fontFamily: "Azeret Mono",
                        fontSize: "9px",
                    }}
                ></Chip>
            </Grid>
            <Grid item>
                <Typography variant="pillLabel">updated 15 mins ago</Typography>
            </Grid>
        </Grid>
    );
}

export default LivePill;
