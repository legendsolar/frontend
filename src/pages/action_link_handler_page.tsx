import useNavBar from 'hooks/use_nav_bar';
import {useEffect, useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {LOCAL_STORAGE_KEYS} from 'storage/local_storage_keys';
import {useAccount} from 'hooks/use_accounts';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from 'firebase/auth';
import {useFirebaseApp} from 'reactfire';

const emailParam = (url: string) => {
    const objUrl = new URL(url);
    if (objUrl.searchParams.has('email')) {
        return objUrl.searchParams.get('email');
    }

    return null;
};

const ActionLinkHandlerPage = () => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const navigate = useNavigate();

    // https://firebase.google.com/docs/auth/web/email-link-auth
    const email = emailParam(window.location.href); // TODO does this leave user open to session fixation attack?

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href) && email) {
            signInWithEmailLink(auth, email, window.location.href);

            navigate(ROUTES.USER_HOME);
        } else {
            navigate(ROUTES.USER_HOME);
        }
    }, []);
    return <></>;
};
export default ActionLinkHandlerPage;
