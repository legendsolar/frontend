import { Drawer, Box } from "@mui/material";
import NavBar from "../components/nav_bar";

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
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {props.drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    ml: `${props.drawerWidth + 40}px`,
                    mr: "40px",
                }}
            >
                {props.mainContent}
            </Box>
        </Box>
    );
};

export default SideBarNavView;
