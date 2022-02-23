import { Typography, Stack, Paper } from "@mui/material";
import PropTypes from "prop-types";

const ErrorComponent = ({}) => {
    return (
        <Paper variant="container" sx={{ p: 2, width: "100%", height: "100%" }}>
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
            >
                <Typography>Oops... an error occured while loading</Typography>
            </Stack>
        </Paper>
    );
};

export default ErrorComponent;
