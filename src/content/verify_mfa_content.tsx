import DefaultComponent from 'components/utils/default_component';
import {Button, Stack, Typography} from '@mui/material';

interface VerifyMfaContentProps {
    onChangePhoneRequested(newPhone: string): Promise<any>;
    onMfaCodeSubmit(code: string): Promise<any>;
}

const VerifyMfaContent = ({
    onChangePhoneRequested,
    onMfaCodeSubmit,
}: VerifyMfaContentProps) => {
    return (
        <DefaultComponent>
            <Typography variant={'smallHeadline' as any}>Verify MFA</Typography>
            <Typography variant={'body1'}>
                You’ll recive a text message with a confiremation code shortly.
            </Typography>
            <Button variant={'primary' as any}>Send Again</Button>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                sx={{pl: 2, pr: 2}}
            >
                {/* <Button variant={"text" as any} onClick={onChangeEmailAddressRequested}>
        <Typography
            variant={"smallLabel" as any}
            color="legendaryGreen.main"
            sx={{ml: 1}}
        >
            {' Login'}
        </Typography>
    </Button> */}
            </Stack>
        </DefaultComponent>
    );
};

export default VerifyMfaContent;
