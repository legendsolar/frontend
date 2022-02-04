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
        <Chip
            size="small"
            variant="light"
            avatar={
                <CircleIcon
                    fontSize="small"
                    color="action"
                    style={{
                        color: "green",
                        width: "10px",
                        height: "10px",
                    }}
                />
            }
            label={"Live"}
            sx={{
                textTransform: "uppercase",
                fontSize: "22px",
                fontWeight: 400,
                color: "blackDawn.main",
            }}
        ></Chip>
    );
}

export default LivePill;
