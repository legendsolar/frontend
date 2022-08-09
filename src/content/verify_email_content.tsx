import {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';
import ChangeEmailComponent from 'components/user/change_email_component';

interface VerifyEmailContentProps {
    email: string;
    onSendVerificationEmailAgain(): Promise<any>;
    onChangeEmailAddressRequested(newEmail: string): Promise<any>;
}

const VerifyEmailContent = ({
    email,
    onSendVerificationEmailAgain,
    onChangeEmailAddressRequested,
}: VerifyEmailContentProps) => {
    const states = {
        VERIFY_EMAIL: 'verify_email',
        CHANGE_EMAIL: 'change_email',
    };

    const [state, setState] = useState(states.VERIFY_EMAIL);

    switch (state) {
        case states.VERIFY_EMAIL:
            return (
                <DefaultComponent>
                    <Stack>
                        <Typography variant={'smallHeadline' as any}>
                            Verify Email
                        </Typography>
                        <Typography variant={'body1'}>
                            We sent an email verification link to the address {}
                        </Typography>
                        <Typography variant={'body1'}>
                            Click the link contained in this email to verify
                            your account
                        </Typography>

                        <Button
                            variant={'primary' as any}
                            onClick={onSendVerificationEmailAgain}
                        >
                            Send Again
                        </Button>
                        <Stack
                            direction="row"
                            justifyContent={'flex-end'}
                            sx={{pl: 2, pr: 2}}
                        >
                            <Button
                                variant={'text' as any}
                                onClick={() => setState(states.CHANGE_EMAIL)}
                            >
                                <Typography
                                    variant={'smallLabel' as any}
                                    color="legendaryGreen.main"
                                    sx={{ml: 1}}
                                >
                                    {'Re-Enter Email'}
                                </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </DefaultComponent>
            );
        case states.CHANGE_EMAIL:
            return (
                <DefaultComponent>
                    <Stack>
                        <Typography variant={'smallHeadline' as any}>
                            Re-enter email
                        </Typography>

                        <ChangeEmailComponent
                            onSubmit={onChangeEmailAddressRequested}
                        ></ChangeEmailComponent>
                    </Stack>
                </DefaultComponent>
            );
        default:
            throw Error('Improper state');
    }
};

export default VerifyEmailContent;
