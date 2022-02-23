import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";
import NavBar from "../components/nav_bar";

const DefaultView = (props) => {
    return (
        <Box justifyContent="center" alignItems="center" width="100%">
            <NavBar></NavBar>
            <Box
                sx={{
                    maxWidth: {
                        sm: "500px",
                        md: "700px",
                        lg: "1100px",
                    },
                    mt: 8,
                    mr: "auto",
                    ml: "auto",
                }}
            >
                <DefaultErrorBoundary>{props.children}</DefaultErrorBoundary>
            </Box>
        </Box>
    );
};

export default DefaultView;
