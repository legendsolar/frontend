import { Paper, Box } from "@mui/material";
import { useState } from "react";

const DefaultComponent = ({ inactive, disabled, children, sx }) => {
    const opacity = inactive || disabled ? 0.5 : 1;
    const pointerEvents = disabled ? "none" : "all";

    const [loading, setLoading] = useState(false);

    return (
        <Paper
            variant="container"
            sx={{
                ...sx,
                pointerEvents: pointerEvents,
            }}
        >
            <Box
                sx={{
                    opacity: opacity,
                }}
            >
                {children}
            </Box>
        </Paper>
    );
};

export default DefaultComponent;
