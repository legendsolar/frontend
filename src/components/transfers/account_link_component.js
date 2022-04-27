import {Stack, Button, Box, Typography} from '@mui/material';
import CheckboxList from 'components/inputs/checkbox_list';
import {useState} from 'react';
import PlaidLink from 'components/plaid/plaid_link';
import {
    useDatabase,
    useDatabaseObjectData,
    useFirestoreDocData,
} from 'reactfire';
import {ref} from 'firebase/database';
import {useAuth} from 'hooks/use_auth';
import LoadingComponent from 'components/utils/loading_component';

const AccountLinkComponent = ({onContinue, onComplete, onLinkComplete}) => {
    const user = useAuth().user;
    const [continueAllowed, setContinueAllowed] = useState(false);

    const database = useDatabase();

    const {status, data: userInfo} = useDatabaseObjectData(
        ref(database, 'users/' + user.uid),
    );

    const onPlaidSuccess = () => {
        onLinkComplete();
        setContinueAllowed(true);
        onComplete();
    };

    if (status === 'loading') {
        return <LoadingComponent></LoadingComponent>;
    }

    if (userInfo?.plaid?.accounts) {
    }

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Link Financial Account
            </Typography>

            {userInfo?.plaid?.accounts && (
                <>
                    <Typography variant="body2">Accounts</Typography>
                    <Typography variant="description">[DEBUG]</Typography>
                    {Object.entries(userInfo?.plaid?.accounts).map(
                        ([key, account]) => {
                            return (
                                <Stack>
                                    <Typography variant="description">
                                        {'access token:' + account.accessToken}
                                    </Typography>
                                    <Typography variant="description">
                                        {'processor token:' +
                                            account.processorToken}
                                    </Typography>
                                </Stack>
                            );
                        },
                    )}
                </>
            )}

            <PlaidLink onSuccess={onPlaidSuccess}></PlaidLink>

            <Button
                variant="primary"
                disabled={!continueAllowed}
                onClick={() => onContinue()}
            >
                Continue
            </Button>
        </Stack>
    );
};

export default AccountLinkComponent;