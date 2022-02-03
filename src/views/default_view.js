import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import NavBar from "../components/nav_bar";

const DefaultView = (props) => {
    return (
        <Box position="relative">
            <NavBar></NavBar>
            <Box
                component="main"
                sx={{
                    ml: `${40}px`,
                    mr: "40px",
                    width: "100%",
                    zIndex: 4,
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default DefaultView;
