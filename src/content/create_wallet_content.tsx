import {Alert, Collapse, Stack, CircularProgress} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

import Divider from 'components/basics/divider';
import ModifyUserInfo from 'components/user/modify_user_info';
import ProtectedUserInfo from 'components/user/protected_user_info';
import {ErrorTypes} from 'utils/errors';
import {Error} from 'utils/error_types';
import {UserDwollaAccountData} from 'schema/schema_gen_types';
import DefaultComponent from 'components/utils/default_component';

interface CreateDwollaAccountProps {
    onSubmit(input: UserDwollaAccountData): Promise<any>;
    loading: boolean;
    fullSSNRequired: boolean;
    color: 'dark' | 'light';
}

const CreateWalletContent = ({
    onSubmit,
    loading,
    fullSSNRequired,
    color = 'dark',
}: CreateDwollaAccountProps) => {
    const [userInfoValid, setUserInfoValid] = useState(false);
    const [protectedUserInfoValid, setProtectedUserInfoValid] = useState(false);
    const [error, setError] = useState<Error>();
    const [values, setValues] = useState<any>({});

    const submit = () => {
        onSubmit(values).catch((error) => {
            if (
                error.type === ErrorTypes.SystemError ||
                error.type === ErrorTypes.DwollaError
            ) {
                setError(error.message);
            }
        });
    };

    return (
        <DefaultComponent standardWidth={false} width="500px">
            <Typography variant={'smallHeadline' as any}>
                Create Legends Wallet
            </Typography>

            <Typography variant="body1">
                Information will never be used for marketing.
            </Typography>

            <Typography variant="subtitle2">Mailing Address</Typography>

            <ModifyUserInfo
                color={color}
                isValid={(valid: any) => setUserInfoValid(valid)}
                handleChange={(childValues: any) =>
                    setValues({
                        ...values,
                        ...childValues,
                    })
                }
            ></ModifyUserInfo>

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography variant="subtitle2">
                    Personal Information
                </Typography>
            </Stack>

            <ProtectedUserInfo
                color={color}
                fullSSNRequired={fullSSNRequired}
                isValid={(valid: any) => setProtectedUserInfoValid(valid)}
                handleChange={(childValues: any) =>
                    setValues({
                        ...values,
                        ...childValues,
                    })
                }
                completed={false}
            ></ProtectedUserInfo>

            {error && (
                <Alert severity="error">
                    {'Sorry, retry! ' + error.message}
                </Alert>
            )}

            <Collapse in={fullSSNRequired}>
                <Alert severity="error">
                    Additional verification is required. Double check that your
                    information is correct and enter your complete 9 digit SSN
                </Alert>
            </Collapse>

            <Button
                variant={'primary' as any}
                disabled={!(userInfoValid && protectedUserInfoValid)}
                color={'legendaryGreen' as any}
                onClick={submit}
            >
                {loading ? (
                    <CircularProgress color={'light' as any} size={30} />
                ) : (
                    'Continue'
                )}
            </Button>
        </DefaultComponent>
    );
};
export default CreateWalletContent;
