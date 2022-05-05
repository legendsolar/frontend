import {Alert, Collapse, Stack, CircularProgress} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

import Divider from 'components/basics/divider';
import ModifyUserInfo from 'components/user/modify_user_info';
import ProtectedUserInfo from 'components/user/protected_user_info';
import {ErrorTypes} from 'utils/errors';

const CreateDwollaAccount = ({userStatus, onSubmit, loading}) => {
    const fullSSNRequired = userStatus === 'DWOLLA_ACCOUNT_RETRY_REQ';

    const [userInfoValid, setUserInfoValid] = useState(false);
    const [protectedUserInfoValid, setProtectedUserInfoValid] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({});

    return (
        <Stack spacing={4}>
            <Typography variant="subtitle1">
                When your solar panels sell electricity and earn cash, dividends
                are sent to your Legends Wallet, which you can access here. You
                can transfer funds to linked bank accounts.
            </Typography>

            <Typography variant="body1">
                We require this information to securely create your Legends
                Wallet. This information will not be used for marketing
                purposes.
            </Typography>

            <Divider></Divider>

            <Typography variant="subtitle2">Mailing Address</Typography>

            <ModifyUserInfo
                isValid={(valid) => setUserInfoValid(valid)}
                handleChange={(childValues) =>
                    setValues({
                        ...values,
                        ...childValues,
                    })
                }
            ></ModifyUserInfo>

            <Divider></Divider>

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
                fullSSNRequired={fullSSNRequired}
                isValid={(valid) => setProtectedUserInfoValid(valid)}
                handleChange={(childValues) =>
                    setValues({
                        ...values,
                        ...childValues,
                    })
                }
                completed={userStatus == 'IDENTITY_VERIFIED'}
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
                variant="primary"
                disabled={!(userInfoValid && protectedUserInfoValid)}
                color="legendaryGreen"
                onClick={(event) => {
                    onSubmit(values);
                }}
            >
                {loading ? (
                    <CircularProgress color="light" size={30} />
                ) : (
                    'Continue'
                )}
            </Button>
        </Stack>
    );
};
export default CreateDwollaAccount;
