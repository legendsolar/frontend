import {Alert, Collapse, Stack, CircularProgress} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Divider from 'components/basics/divider';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import ModifyUserInfo from 'components/user/modify_user_info';
import ProtectedUserInfo from 'components/user/protected_user_info';
import {fetchUserSignUpState, selectUserSignUpState} from 'slices/user_slice';
import {transformUserDataToDwollaObject} from 'components/signup/utils';

const CreateDwollaAccount = ({onComplete}) => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const cloudFunctions = useCloudFunctions();

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status,
    );

    useEffect(() => {
        if (userSignUpStateStatus === 'idle' && auth.user) {
            console.log(
                'dispatch fetch user state: line 46, create dwolla account',
            );
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    }, [dispatch, userSignUpStateStatus, auth.user]);

    const userSignUpState = useSelector(selectUserSignUpState);

    const dwollaUpdateOrCreateFunction =
        userSignUpState === 'ACCREDATION_VERIF_COMPLETE'
            ? cloudFunctions.attemptCreateNewDwollaVerifiedUser
            : cloudFunctions.updateDwollaUser;

    const fullSSNRequired = userSignUpState === 'DWOLLA_ACCOUNT_RETRY_REQ';

    const [loading, setLoading] = useState(false);
    const [inputValid, setInputValid] = useState([false, false]);
    const [userInfo, setUserInfo] = useState(false);

    const [submitErrorMessage, setSubmitErrorMessage] = useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dwollaObject = transformUserDataToDwollaObject(userInfo);

        setLoading(true);

        dwollaUpdateOrCreateFunction(dwollaObject)
            .then((resp) => {
                console.log(resp);
                onComplete();
            })
            .catch((error) => {
                console.log(error);
                const errorJson = JSON.parse(JSON.stringify(error));
                console.log(errorJson);
                setSubmitErrorMessage(errorJson.details.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onUpdate = (newInfo, formId) => {
        const error = Object.keys(newInfo)
            .map((key) => {
                return newInfo[key].error;
            })
            .some((el) => el);

        const newInputValid = [...inputValid];

        if (!newInfo || error) {
            newInputValid[formId] = false;
        } else {
            newInputValid[formId] = true;
            setUserInfo({
                ...userInfo,
                ...newInfo,
            });
        }

        setInputValid(newInputValid);
    };

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
                onUpdate={(unprotectedUserInfo) => {
                    onUpdate(unprotectedUserInfo, 0);
                }}
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
                {/* <Chip variant="selected" label="Why do we need this?"></Chip> */}
            </Stack>

            <ProtectedUserInfo
                fullSSNRequired={fullSSNRequired}
                onUpdate={(protectedUserInfo) => {
                    onUpdate(protectedUserInfo, 1);
                }}
                completed={userSignUpState == 'DWOLLA_ACCOUNT_VERIFIED'}
            ></ProtectedUserInfo>

            {submitErrorMessage && (
                <Alert severity="error">
                    {'Sorry, retry! ' + submitErrorMessage}
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
                disabled={!inputValid.every((valid) => valid)}
                color="legendaryGreen"
                onClick={handleSubmit}
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
