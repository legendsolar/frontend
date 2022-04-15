import { Paper } from "@mui/material";

const SideBar = ({ children }) => {
    return (
        <Paper variant="container" sx={{ width: "100%", m: 0 }}>
            {children}
        </Paper>
    );
};

export default SideBar;
