import { Typography, Stack, Button } from "@mui/material";
import DefaultComponent from "./default_component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageinatedComponent = ({ children, title, onBack, backDisabled }) => {
    return (
        <DefaultComponent>
            <Stack direction="row" alignItems="center">
                <Button onClick={onBack} disabled={backDisabled} variant="mono">
                    <ArrowBackIcon fontSize="large"></ArrowBackIcon>
                </Button>
                <Typography variant="smallHeadline">{title}</Typography>
            </Stack>

            {children}
        </DefaultComponent>
    );
};

export default PageinatedComponent;
