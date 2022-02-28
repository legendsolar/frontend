import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";
import NavBar from "../components/nav_bar";
import UserStatus from "../components/user_status";
import { useAuth } from "../hooks/use_auth";

const DefaultView = (props) => {
    const auth = useAuth();

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
                {auth.user && (
                    <Paper variant="container" sx={{ mt: 4 }}>
                        <UserStatus></UserStatus>
                    </Paper>
                )}
                {props.children}
            </Box>
        </Box>
    );
};

export default DefaultView;
