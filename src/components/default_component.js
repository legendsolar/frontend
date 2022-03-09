import { forwardRef } from "react";
import { Paper, Box } from "@mui/material";
import { useState } from "react";

const DefaultComponent = forwardRef(
    ({ inactive, disabled, children, sx }, ref) => {
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
                ref={ref}
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
    }
);

export default DefaultComponent;
