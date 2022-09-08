import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
    return (
        <Box
            sx={{
                display: "flex",
            }}
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingComponent;
