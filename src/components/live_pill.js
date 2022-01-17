import React from "react";
import { auth, database, firebaseApp } from "../../Firebase";
import { ref } from "firebase/database";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import styles from "./MetricGauge.module.css";
import { format } from "date-fns";

function LiveIcon(props) {
    return <div>Live</div>;
}
