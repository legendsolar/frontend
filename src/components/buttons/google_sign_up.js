import { Stack, Button, Typography } from "@mui/material/";
import GoogleLogo from "../icons/google_logo";

const GoogleSignUp = () => {
    return (
        <Button variant="medium">
            <GoogleLogo sx={{ ml: 2 }}></GoogleLogo>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", ml: -9 }}
            >
                <Typography justifyContent="center" variant="smallLabel">
                    Log In With Google
                </Typography>
            </Stack>
        </Button>
    );
};

export default GoogleSignUp;
