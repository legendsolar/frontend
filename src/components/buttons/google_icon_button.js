import { Stack, Button, Typography } from "@mui/material/";
import GoogleLogo from "../icons/google_logo";

const GoogleIconButton = ({ label, onClick }) => {
    return (
        <Button variant="medium" onClick={onClick}>
            <GoogleLogo sx={{ ml: 2 }} height="60px"></GoogleLogo>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", ml: -9 }}
            >
                <Typography justifyContent="center" variant="smallLabel">
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};

export default GoogleIconButton;
