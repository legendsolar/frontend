import React from "react";
import { auth, database, firebaseApp } from "../../Firebase";
import { ref } from "firebase/database";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import { format } from "date-fns";
import CircleIcon from "@mui/icons-material/Circle";

function LivePill(props) {
    return (
        <Chip
            avatar={<CircleIcon></CircleIcon>}
            label={<Typography variant="pillLabel">LIVE</Typography>}
        ></Chip>
    );
}

export default LivePill;
