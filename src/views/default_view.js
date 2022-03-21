import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";
import NavBar from "../components/nav_bar";
import UserStatus from "../components/user_status";
import { useAuth } from "../hooks/use_auth";
import Footer from "../components/footer";

const DefaultView = (props) => {
    const auth = useAuth();
    const backgroundColor = !!auth?.user ? "blackDusk.main" : "blackDawn.main";
    const headerHeight = "300px";

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <Box
                position="absolute"
                sx={{
                    height: headerHeight,
                    width: "100%",
                    backgroundColor: backgroundColor,
                    zIndex: -1,
                }}
            ></Box>
            <Box
                position="fixed"
                top={0}
                bottom={0}
                left={0}
                right={0}
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "whiteHaze.main",
                    zIndex: -2,
                    transform: "translate3d(0, 0, -10px)",
                }}
            ></Box>
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
                    mt: 16,
                }}
            >
                {props.children}

                <Footer></Footer>
            </Box>
        </Box>
    );
};

export default DefaultView;
