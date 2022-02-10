import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import NavBar from "../components/nav_bar";
import { ErrorBoundary } from "@sentry/react";
import DefaultView from "./default_view";

const LoadingView = (props) => {
    return <DefaultView></DefaultView>;
};

export default LoadingView;
