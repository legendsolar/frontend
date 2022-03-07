import { Paper, Box } from "@mui/material";

const DefaultComponent = ({ inactive, disabled, children, sx }) => {
    const opacity = inactive || disabled ? 0.5 : 1;
    const pointerEvents = disabled ? "none" : "all";

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
