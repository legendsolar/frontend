import { Stack, Button, Typography } from "@mui/material/";
import GoogleLogo from "../icons/google_logo";

const IconButton = ({ label, onClick, icon, color }) => {
    return (
        <Button
            variant="secondary"
            onClick={onClick}
            sx={{
                backgroundColor: color + ".main",
                color: color + ".contrastText",
            }}
        >
            {icon}
            <Stack
                direction="row"
                alignItems="center"
                sx={{ width: "100%", ml: 8 }}
            >
                <Typography
                    justifyContent="center"
                    variant="smallLabel"
                    color={color + ".contrastText"}
                >
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};

export default IconButton;
