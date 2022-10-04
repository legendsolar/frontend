import useNavBar from 'hooks/use_nav_bar';
import {useEffect, useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {LOCAL_STORAGE_KEYS} from 'storage/local_storage_keys';
import {useAccount} from 'hooks/use_accounts';
import {CreateAccountInput} from 'schema/schema_gen_types';
import {
    transformPlaidDataToCreateAccountInput,
    transformPlaidVerificationStatus,
} from 'transformers/plaid_api_transformers';

const OAuthLink = () => {
    const navigate = useNavigate();

    const {useCreateAccount} = useAccount();

    const {
        createAccount,
        loading: createAccountLoading,
        error: createAccoutError,
        account,
    } = useCreateAccount();

    // The Link token from the first Link initialization
    const linkToken = localStorage.getItem(LOCAL_STORAGE_KEYS.PLAID_LINK_TOKEN);

    if (!linkToken) {
        navigate(ROUTES.USER_HOME);
    }

    const onSuccess = (public_token: string, metadata: any) => {
        // send public_token to server, retrieve access_token and item_id
        // return to "https://example.com" upon completion
        const input = transformPlaidDataToCreateAccountInput(
            public_token,
            metadata,
        );

        // create account
        createAccount(input);

        localStorage.removeItem(LOCAL_STORAGE_KEYS.PLAID_LINK_TOKEN);

        navigate(ROUTES.ACCOUNT);
    };

    const onExit = (err, metadata) => {
        // handle error...

        console.log(err, metadata);
        navigate(ROUTES.ACCOUNT);
    };

    const config: Parameters<typeof usePlaidLink>[0] = {
        token: linkToken!,
        receivedRedirectUri: window.location.href, //the redirect URI with an OAuth state ID parameter
        onSuccess,
        onExit,
    };
    const {open, ready, error} = usePlaidLink(config);

    console.log({plaidError: error});
    // automatically reinitialize Link
    useEffect(() => {
        if (ready) {
            open();
        }
    }, [ready, open]);
    return <></>;
};
export default OAuthLink;
