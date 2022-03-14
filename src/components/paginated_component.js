import { Typography, Stack, Button } from "@mui/material";
import DefaultComponent from "./default_component";

const PageinatedComponent = ({ children, title, onBack, backDisabled }) => {
    return (
        <DefaultComponent>
            <Stack direction="row" justifyContent={"space-between"}>
                <Typography>{title}</Typography>
                <Button
                    onClick={onBack}
                    disabled={backDisabled}
                    variant="secondary"
                >
                    Back
                </Button>
            </Stack>

            {children}
        </DefaultComponent>
    );
};

export default PageinatedComponent;
