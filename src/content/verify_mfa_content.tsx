import Component from 'components/basics/component';
import {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import MfaVerifyComponent from 'components/inputs/mfa_verify_component';
import ChangePhoneComponent from 'components/inputs/change_phone_component';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';
import {RecaptchaVerifier as FirebaseRecaptchaVerifier} from 'firebase/auth';
interface VerifyMfaContentProps {
    onChangePhoneRequested(newPhone: string): Promise<void>;
    onMfaCodeSubmit(code: string): Promise<void>;
    captchaComplete(captcha: FirebaseRecaptchaVerifier): void;
    mfaCodeSent: boolean;
}

const VerifyMfaContent = ({
    onChangePhoneRequested,
    onMfaCodeSubmit,
    captchaComplete,
    mfaCodeSent,
}: VerifyMfaContentProps) => {
    const states = {
        VERIFY_MFA: 'verify_mfa',
        CHANGE_PHONE: 'change_phone',
    };

    const [state, setState] = useState(states.VERIFY_MFA);

    switch (state) {
        case states.VERIFY_MFA:
            return (
                <Component sx={{background: 'none'}}>
                    <Typography variant={'smallHeadline' as any}>
                        Verify MFA
                    </Typography>
                    <Typography variant={'body1'}>
                        You’ll recive a text message with a confiremation code
                        shortly.
                    </Typography>
                    <MfaVerifyComponent
                        onSubmit={async ({code}) => onMfaCodeSubmit(code)}
                        codeSent={mfaCodeSent}
                        onChangePhoneRequested={() =>
                            setState(states.CHANGE_PHONE)
                        }
                        color="light"
                    ></MfaVerifyComponent>
                    <Stack direction="row" justifyContent={'flex-end'}>
                        <Button
                            variant={'text' as any}
                            onClick={() => setState(states.CHANGE_PHONE)}
                        >
                            <Typography
                                variant={'smallLabel' as any}
                                color="legendaryGreen.main"
                                sx={{ml: 1}}
                            >
                                {'Change Phone'}
                            </Typography>
                        </Button>
                    </Stack>

                    <RecaptchaVerifier
                        captchaComplete={captchaComplete}
                    ></RecaptchaVerifier>
                </Component>
            );
        case states.CHANGE_PHONE:
            return (
                <Component sx={{background: 'none'}}>
                    <Typography variant={'smallHeadline' as any}>
                        Change phone number
                    </Typography>

                    <ChangePhoneComponent
                        onSubmit={async ({phone}) => {
                            onChangePhoneRequested(phone);
                            setState(states.VERIFY_MFA);
                        }}
                        color="light"
                    ></ChangePhoneComponent>
                </Component>
            );
        default:
            throw Error('Improper state');
    }
};

export default VerifyMfaContent;
