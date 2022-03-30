import { Box } from "@mui/material";
/**
 *
 * Note: these must surrounded by an empty <div> tag to work properly?
 *
 * @param {*} param0
 * @returns
 */
const Divider = ({ sx }) => {
    return (
        <Box
            sx={{
                height: "2px",
                backgroundColor: "whiteFog.main",
                ml: -4,
                mr: -4,
                ...sx,
            }}
        ></Box>
    );
};

export default Divider;
