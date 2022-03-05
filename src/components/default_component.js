import { Paper } from "@mui/material";

const DefaultComponent = ({ inactive, disabled, children }) => {
    const opacity = inactive || disabled ? 0.5 : 1;
    const pointerEvents = disabled ? "none" : "all";
    return (
        <Paper
            sx={{
                opacity: opacity,
                pointerEvents: pointerEvents,
            }}
            variant="container"
        >
            {children}
        </Paper>
    );
};

export default DefaultComponent;
