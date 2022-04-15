import {Typography, Stack, Button} from '@mui/material';
import DefaultComponent from './default_component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageinatedComponent = ({children, title, onBack, backDisabled}) => {
    return (
        <DefaultComponent>
            <Stack direction="row" alignItems="center">
                {!backDisabled && (
                    <Button
                        onClick={onBack}
                        disabled={backDisabled}
                        variant="mono"
                    >
                        <ArrowBackIcon
                            sx={{
                                fontSize: '22px',
                            }}
                        ></ArrowBackIcon>
                    </Button>
                )}

                <Typography variant="smallHeadline">{title}</Typography>
            </Stack>

            {children}
        </DefaultComponent>
    );
};

export default PageinatedComponent;
