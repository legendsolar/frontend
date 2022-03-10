import { Box, Stack } from "@mui/material";
import Divider from "./divider";

const ContentDivider = ({ sx, children }) => {
    return (
        <Stack
            direction="row"
            sx={{
                width: "100%",
                ...sx,
            }}
            justifyContent="center"
            alignItems="center"
        >
            <Divider sx={{ mr: 2 }} />
            {children}
            <Divider sx={{ ml: 2 }} />
        </Stack>
    );
};

export default ContentDivider;