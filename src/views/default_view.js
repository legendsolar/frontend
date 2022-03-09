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
                    width: {
                        sm: "550px",
                        md: "850px",
                        lg: "1100px",
                    },
                    mr: "auto",
                    ml: "auto",
                    mt: 6,
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default DefaultView;
