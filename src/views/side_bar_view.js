import { Drawer, Box } from "@mui/material";
import NavBar from "../components/nav_bar";
import { ErrorBoundary } from "@sentry/react";

const SideBarNavView = (props) => {
    return (
        <Box>
            <NavBar></NavBar>
            <Drawer
                sx={{
                    width: props.drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: props.drawerWidth,
                        height: "auto",
                        boxSizing: "border-box",
                        mt: "165px",
                        ml: "20px",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 15px rgba(99, 110, 114, 0.5)",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <ErrorBoundary>{props.drawer}</ErrorBoundary>
            </Drawer>

            <Box
                component="main"
                sx={{
                    ml: `${props.drawerWidth + 40}px`,
                    mr: "40px",
                    zIndex: 3,
                }}
            >
                <ErrorBoundary>{props.mainContent}</ErrorBoundary>
            </Box>
        </Box>
    );
};

export default SideBarNavView;
