import { Box } from "@mui/material";

const Divider = ({ sx }) => {
    return (
        <Box
            sx={{
                height: "2px",
                backgroundColor: "whiteFog.main",
                // width: "100%",
                ...sx,
            }}
        ></Box>
    );
};

export default Divider;
