import { Box, Stack, Paper, Grid, Container } from "@mui/material";
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
                    mr: "auto",
                    ml: "auto",
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default DefaultView;
