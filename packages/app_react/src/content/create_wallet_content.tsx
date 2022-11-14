import {Alert, Collapse, Stack, CircularProgress, Link} from '@mui/material';
import {useAuth} from '@project/hooks/use_auth';
import {Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

import {Divider} from '@project/components/basics/divider';
import {ModifyUserInfo} from '@project/components/inputs/modify_user_info';
import {ProtectedUserInfo} from '@project/components/inputs/protected_user_info';
import {ErrorTypes} from '@p/utils/errors';
import {Error} from 'utils/error_types';
import {
    Address,
    AddressInput,
    UserDwollaAccountData,
} from 'schema/schema_gen_types';
import {Component} from '@project/components/basics/component';
import {LoadingText} from '@project/components/utils/loading_text';
import {CheckboxItem} from '@project/components/inputs/checkbox_item';
import {ContentDivider} from '@project/components/basics/content_divider';
import {format} from 'date-fns';

export const transformFormValuesToUserDwollaAccountData = (values: Values) => {
    const dob = new Date(`${values.month} ${values.day} ${values.year}`);

    return {
        address: transformValuesToUserAddress(values),
        ssn: values.ssn,
        dateOfBirth: format(dob, 'P'),
    };
};

export const transformValuesToUserAddress = (values: Values): AddressInput => {
    return {
        streetAddress: values.streetAddress,
        streetAddress2: values.streetAddress2,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
    };
};

interface Values {
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    postalCode: string;
    ssn: string;
    day: number;
    month: string;
    year: string;
}
interface CreateDwollaAccountProps {
    onSubmit(input: Values): void;
    fullSSNRequired: boolean;
    color: 'dark' | 'light';
    loading: boolean;
    error: string | undefined;
}

const CreateWalletContent = ({
    onSubmit,
    fullSSNRequired,
    color = 'dark',
    loading,
    error,
}: CreateDwollaAccountProps) => {
    const [userInfoValid, setUserInfoValid] = useState(false);
    const [protectedUserInfoValid, setProtectedUserInfoValid] = useState(false);
    const [values, setValues] = useState<Values>();
    const [acceptDwollaPolicy, setAcceptDwollaPolicy] =
        useState<boolean>(false);

    const submit = () => {
        if (values) {
            onSubmit(values);
        }
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

            <ContentDivider color="white">
                <Typography variant={'monoButton' as any}>
                    Mailing Address
                </Typography>
            </ContentDivider>

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

            <ContentDivider color="white">
                <Typography variant={'monoButton' as any}>
                    Personal Information
                </Typography>
            </ContentDivider>

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

            {error && <Alert severity="error">{error}</Alert>}

            {fullSSNRequired && (
                <Alert severity="error">
                    Additional verification is required. Double check that your
                    information is correct and enter your complete 9 digit SSN
                </Alert>
            )}

            <CheckboxItem
                title="Dwolla Privacy Policy"
                checked={acceptDwollaPolicy}
                description={
                    <div>
                        I agree to Dwolla's{' '}
                        <Typography
                            variant={'description' as any}
                            component={Link}
                            target={'_blank'}
                            href={
                                'https://www.dwolla.com/legal/platform-agreement/#legal-content'
                            }
                        >
                            privacy policy
                        </Typography>
                    </div>
                }
                onClick={() => {
                    setAcceptDwollaPolicy(!acceptDwollaPolicy);
                }}
            ></CheckboxItem>

            <Button
                variant={'primary' as any}
                disabled={
                    !(
                        userInfoValid &&
                        protectedUserInfoValid &&
                        acceptDwollaPolicy
                    )
                }
                color={'legendaryGreen' as any}
                onClick={submit}
            >
                {loading ? <LoadingText></LoadingText> : 'Continue'}
            </Button>
        </Component>
    );
};
export default CreateWalletContent;
