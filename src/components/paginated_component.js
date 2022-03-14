import { Typography, Stack, Button } from "@mui/material";
import DefaultComponent from "./default_component";

const PageinatedComponent = ({ children, title, onBack, backDisabled }) => {
    return (
        <DefaultComponent>
            <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Typography variant="smallHeadline">{title}</Typography>
                <Button onClick={onBack} disabled={backDisabled} variant="mono">
                    ← Back
                </Button>
            </Stack>

            {children}
        </DefaultComponent>
    );
};

export default PageinatedComponent;
