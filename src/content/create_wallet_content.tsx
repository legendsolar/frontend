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
import Component from 'components/basics/component';

interface CreateDwollaAccountProps {
    onSubmit(input: UserDwollaAccountData): Promise<any>;
    fullSSNRequired: boolean;
    color: 'dark' | 'light';
    initialValues?: any;
}

const CreateWalletContent = ({
    onSubmit,
    fullSSNRequired,
    color = 'dark',
    initialValues = {},
}: CreateDwollaAccountProps) => {
    const [userInfoValid, setUserInfoValid] = useState(false);
    const [protectedUserInfoValid, setProtectedUserInfoValid] = useState(false);
    const [error, setError] = useState<Error>();
    const [values, setValues] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);
        onSubmit(values)
            .catch((error) => {
                if (
                    error.type === ErrorTypes.SystemError ||
                    error.type === ErrorTypes.DwollaError
                ) {
                    setError(error.message);
                }
            })
            .finally(() => {
                setLoading(false); // probably causing a react error after this component is no longer rendered
            });
    };

    return (
        <Component
            standardWidth={false}
            sx={{width: '500px', background: 'none'}}
        >
            <Typography variant={'smallHeadline' as any}>
                Create Legends Wallet
            </Typography>

            <Typography variant="body1">
                Information will never be used for marketing.
            </Typography>

            <Typography variant="subtitle2">Mailing Address</Typography>

            <ModifyUserInfo
                initialValues={{
                    firstName: initialValues?.firstName,
                    lastName: initialValues?.lastName,
                    streetAddress: initialValues?.streetAddress,
                    streetAddress2: initialValues?.streetAddress2,
                    city: initialValues?.city,
                    state: initialValues?.state,
                    postalCode: initialValues?.postalCode,
                }}
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
                initialValues={{
                    ssn: initialValues?.ssn,
                    year: initialValues?.year,
                    month: initialValues?.month,
                    day: initialValues?.day,
                }}
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
        </Component>
    );
};
export default CreateWalletContent;
