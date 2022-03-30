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
        <div>
            <Box
                sx={{
                    height: "2px",
                    backgroundColor: "whiteFog.main",
                    ml: -4,
                    mr: -4,
                    ...sx,
                }}
            ></Box>
        </div>
    );
};

export default Divider;
