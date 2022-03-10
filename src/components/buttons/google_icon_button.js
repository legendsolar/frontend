import { Stack, Button, Typography } from "@mui/material/";
import GoogleLogo from "../icons/google_logo";

const GoogleIconButton = ({ label, onClick }) => {
    return (
        <Button variant="medium" onClick={onClick} disabled={true}>
            <GoogleLogo sx={{ ml: 2 }}></GoogleLogo>
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
