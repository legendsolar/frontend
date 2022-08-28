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
import LoadingText from 'components/utils/loading_text';

interface CreateDwollaAccountProps {
    onSubmit(input: UserDwollaAccountData): Promise<any>;
    fullSSNRequired: boolean;
    color: 'dark' | 'light';
    initialValues?: any;
    loading: boolean;
    error: string | undefined;
}

const CreateWalletContent = ({
    onSubmit,
    fullSSNRequired,
    color = 'dark',
    initialValues = {},
    loading,
    error,
}: CreateDwollaAccountProps) => {
    const [userInfoValid, setUserInfoValid] = useState(false);
    const [protectedUserInfoValid, setProtectedUserInfoValid] = useState(false);
    const [values, setValues] = useState<any>({});

    const submit = () => {
        onSubmit(values);
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

            {error && <Alert severity="error">{error}</Alert>}

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
                {loading ? <LoadingText></LoadingText> : 'Continue'}
            </Button>
        </Component>
    );
};
export default CreateWalletContent;
