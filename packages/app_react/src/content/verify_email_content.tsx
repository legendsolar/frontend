import {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import {Component} from '@project/components/basics/component';
import {ChangeEmailComponent} from '@project/components/inputs/change_email_component';

interface VerifyEmailContentProps {
    color: string;
    email: string;
    onSendVerificationEmailAgain(): Promise<any>;
    onChangeEmailAddressRequested(newEmail: string): Promise<any>;
}

const VerifyEmailContent = ({
    color,
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
                <Component sx={{background: 'none'}}>
                    <Stack spacing={4}>
                        <Typography variant={'smallHeadline' as any}>
                            Verify Email
                        </Typography>
                        <Typography variant={'body1'}>
                            {
                                'We sent an email verification link to the address '
                            }
                            <strong>{email}</strong>
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
                        {/* <Stack
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
                                    {'Change Email'}
                                </Typography>
                            </Button>
                        </Stack> */}
                    </Stack>
                </Component>
            );
        case states.CHANGE_EMAIL:
            return (
                <Component sx={{background: 'none'}}>
                    <Stack>
                        <Typography variant={'smallHeadline' as any}>
                            Change email
                        </Typography>

                        <ChangeEmailComponent
                            color={color}
                            onSubmit={async ({email}) =>
                                onChangeEmailAddressRequested(email)
                            }
                        ></ChangeEmailComponent>
                    </Stack>
                </Component>
            );
        default:
            throw Error('Improper state');
    }
};

export default VerifyEmailContent;
