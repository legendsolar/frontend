import useNavBar from '@project/hooks/use_nav_bar';
import {useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {ROUTES} from 'routes/routes';
import {LOCAL_STORAGE_KEYS} from 'storage/local_storage_keys';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import DualPaneView from 'views/dual_pane_view';
import {Typography, Link} from '@mui/material';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from 'firebase/auth';
import {useFirebaseApp} from 'reactfire';
import {ChangeEmailComponent} from '@project/components/inputs/change_email_component';
import {Component} from '@project/components/basics/component';
import {BackButton} from '@project/components/buttons/back_button';
import {authErrorHandler} from 'utils/auth_error_translator';

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

        if (auth.currentUser) {
            navigate(ROUTES.USER_HOME);
        }
    }, []);

    const onEmailEntered = async ({email}) => {
        if (isSignInWithEmailLink(auth, window.location.href) && email) {
            try {
                await signInWithEmailLink(auth, email, window.location.href);
                navigate(ROUTES.USER_HOME);
            } catch (e) {
                authErrorHandler(e);
            }
        } else {
            // TODO error
        }
    };

    return (
        <DualPaneView
            leftPane={
                <Component sx={{background: 'none'}}>
                    <Typography variant={'smallHeadline' as any}>
                        Complete Sign Up
                    </Typography>

                    <Typography variant={'body2' as any}>
                        Enter the email that the sign up link was sent to.
                    </Typography>
                    <ChangeEmailComponent
                        onSubmit={onEmailEntered}
                        color="light"
                        buttonMessage="Sign Up"
                    ></ChangeEmailComponent>

                    <Typography variant={'description' as any}>
                        Signing up for an account means you agree to our
                        <Typography
                            variant={'link' as any}
                            component={Link}
                            target={'_blank'}
                            href={
                                'https://www.legends.solar/legal/privacy-policy'
                            }
                            // onClick={onNavigateToPrivacyPolicy}
                        >
                            {' '}
                            privacy policy
                        </Typography>{' '}
                        and{' '}
                        <Typography
                            variant={'link' as any}
                            component={Link}
                            target={'_blank'}
                            href={
                                'https://www.legends.solar/legal/terms-and-conditions'
                            }
                        >
                            {' '}
                            terms of service
                        </Typography>
                    </Typography>
                </Component>
            }
            rightPane={
                <img src={WomanPanelsSVG} style={{width: '300px'}}></img>
            }
            upperLeftCorner={
                <BackButton
                    label="Back to Homepage"
                    linkText={'https://legends.solar'}
                ></BackButton>
            }
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
