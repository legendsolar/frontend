import useNavBar from 'hooks/use_nav_bar';
import {useEffect, useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';
import {LOCAL_STORAGE_KEYS} from 'storage/local_storage_keys';
import PanelPersonBlueSVG from 'assets/images/panel_person_blue.svg';
import DualPaneView from 'views/dual_pane_view';
import {Typography} from '@mui/material';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from 'firebase/auth';
import {useFirebaseApp} from 'reactfire';
import ChangeEmailComponent from 'components/inputs/change_email_component';
import Component from 'components/basics/component';

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
    // const email = emailParam(window.location.href); // TODO does this leave user open to session fixation attack?

    useEffect(() => {
        if (!isSignInWithEmailLink(auth, window.location.href)) {
            navigate(ROUTES.USER_HOME);
        }
    }, []);

    const onEmailEntered = async ({email}) => {
        if (isSignInWithEmailLink(auth, window.location.href) && email) {
            await signInWithEmailLink(auth, email, window.location.href);
            navigate(ROUTES.USER_HOME);
        } else {
            // TODO error
        }
    };

    return (
        <DualPaneView
            leftPane={
                <Component sx={{background: 'none'}}>
                    <Typography variant={'smallHeadline' as any}>
                        Complete Sign In
                    </Typography>

                    <Typography variant={'body2' as any}>
                        Enter the email that the magic link was sent to
                    </Typography>
                    <ChangeEmailComponent
                        onSubmit={onEmailEntered}
                        color="light"
                        buttonMessage="Log In"
                    ></ChangeEmailComponent>
                </Component>
            }
            rightPane={
                <img src={PanelPersonBlueSVG} style={{width: '300px'}}></img>
            }
            upperLeftCorner={<></>}
            options={{
                rightPane: {
                    justifyContent: 'center',
                },
            }}
        ></DualPaneView>
    );
    return <></>;
};
export default ActionLinkHandlerPage;
