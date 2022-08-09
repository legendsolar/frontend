import DefaultComponent from 'components/utils/default_component';
import {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import MfaVerifyComponent from 'components/user/mfa_verify_component';
import ChangePhoneComponent from 'components/user/change_phone_component';

interface VerifyMfaContentProps {
    onChangePhoneRequested(newPhone: string): Promise<any>;
    onMfaCodeSubmit(code: string): Promise<any>;
}

const VerifyMfaContent = ({
    onChangePhoneRequested,
    onMfaCodeSubmit,
}: VerifyMfaContentProps) => {
    const states = {
        VERIFY_MFA: 'verify_mfa',
        CHANGE_PHONE: 'change_phone',
    };

    const [state, setState] = useState(states.VERIFY_MFA);

    switch (state) {
        case states.VERIFY_MFA:
            return (
                <DefaultComponent>
                    <Typography variant={'smallHeadline' as any}>
                        Verify MFA
                    </Typography>
                    <Typography variant={'body1'}>
                        You’ll recive a text message with a confiremation code
                        shortly.
                    </Typography>
                    <MfaVerifyComponent
                        onSubmit={onMfaCodeSubmit}
                        codeSent={true}
                        onChangePhoneRequested={() =>
                            setState(states.CHANGE_PHONE)
                        }
                        color="light"
                    ></MfaVerifyComponent>
                </DefaultComponent>
            );
        case states.CHANGE_PHONE:
            return (
                <DefaultComponent>
                    <Typography variant={'smallHeadline' as any}>
                        Re-enter phone number
                    </Typography>

                    <ChangePhoneComponent
                        onSubmit={onChangePhoneRequested}
                        color="light"
                    ></ChangePhoneComponent>
                </DefaultComponent>
            );
        default:
            throw Error('Improper state');
    }
};

export default VerifyMfaContent;
