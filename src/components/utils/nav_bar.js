import {useEffect, useLayoutEffect, useMemo} from 'react';
import {useAuth} from 'hooks/use_auth';
import {Button, Stack, Typography, Toolbar, Box, AppBar} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {redirectToHomePage} from 'webflow/webflowLinking';
import LegendsSolarLogo from 'components/icons/legends_solar_logo';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserSignUpState} from 'slices/user_slice';
import {selectUserSignUpState} from 'slices/user_slice';
import {selectWalletBalance} from 'slices/wallet_slice';
import {fetchWalletBalance} from 'slices/wallet_slice';
import store from 'store';
import PropTypes from 'prop-types';
import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';

const NavBar = ({
    loading,
    userIsAuthenticated,
    userStatus,
    walletBalance,
    onToHomepage,
    onYourRooftop,
    onTransaction,
    onDocuments,
    onAvailablePanels,
    onAccount,
    onWallet,
}) => {
    // const auth = useAuth();
    // const user = auth.user;

    // const navigate = useNavigate();
    // const cloudFunctions = useCloudFunctions();
    // const dispatch = useDispatch();

    // const userSignUpStateStatus = useSelector(
    //     (state) => state.user.signUpState.status,
    // );
    // const userSignUpState = useSelector(selectUserSignUpState);
    // const balanceStatus = useSelector((state) => state.wallet.balance.status);

    // useEffect(() => {
    //     console.log(
    //         'nav bar user sign up status: ',
    //         userSignUpStateStatus,
    //         !!auth.user,
    //     );

    //     if (store.getState().user.signUpState.status === 'idle' && auth.user) {
    //         console.log('dispatch user state, line 30 nav bar');
    //         dispatch(fetchUserSignUpState(cloudFunctions));

    //         console.log('dispatch complete ');
    //         console.log(
    //             'post dispatch sign up status: ' + userSignUpStateStatus,
    //         );
    //     }
    // }, [dispatch, store.getState().user.signUpState.status, auth.user]);

    // useEffect(() => {
    //     if (balanceStatus === 'idle' && user) {
    //         console.log('fetch wallet, line 37 nav bar');
    //         dispatch(fetchWalletBalance(cloudFunctions));
    //     }
    // }, [user, dispatch, balanceStatus]);

    // const walletBalance = useSelector(selectWalletBalance);

    return (
        <Toolbar
            style={{
                padding: 0,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                }}
                display="flex"
                justifyContent={'center'}
            >
                <Box
                    sx={{
                        width: '100%',
                        ml: 10,
                        mr: 10,
                        mt: 6,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={'flex-end'}
                        sx={{
                            width: '100%',
                            zIndex: 1,
                            transform: 'translate3d(0, 0, 0px)',
                        }}
                    >
                        <Box
                            sx={{
                                width: '120px',
                                height: '45px',
                            }}
                            alt="logo"
                        >
                            <LegendsSolarLogo></LegendsSolarLogo>
                        </Box>

                        {userIsAuthenticated &&
                            userStatus === USER_STATUS.IDENTITY_VERIFIED && (
                                <Stack
                                    direction="row"
                                    alignItems={'flex-end'}
                                    sx={
                                        {
                                            // display: { xs: "none", sm: "block" },
                                        }
                                    }
                                >
                                    <Button
                                        variant="header"
                                        onClick={onYourRooftop}
                                    >
                                        <Typography variant="appBarHeader">
                                            Your Rooftop
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="header"
                                        onClick={onTransaction}
                                    >
                                        <Typography variant="appBarHeader">
                                            Transactions
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="header"
                                        onClick={onDocuments}
                                    >
                                        <Typography variant="appBarHeader">
                                            Documents
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="header"
                                        onClick={onAvailablePanels}
                                    >
                                        <Typography variant="appBarHeader">
                                            Available Panels
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="header-outlined"
                                        onClick={onAccount}
                                    >
                                        <Typography variant="appBarHeader">
                                            Account
                                        </Typography>
                                    </Button>

                                    <Stack sx={{maxWidth: '174px'}} spacing={1}>
                                        <Typography
                                            variant="smallLabel"
                                            sx={{
                                                color: 'white.main',
                                                lineHeight: '12px',
                                            }}
                                        >
                                            Legends Wallet
                                        </Typography>
                                        <Button
                                            variant="header-filled"
                                            sx={{mt: 0}}
                                            onClick={onWallet}
                                        >
                                            {'$' +
                                                (walletBalance
                                                    ? walletBalance
                                                    : '-')}
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}

                        {(!userIsAuthenticated ||
                            userStatus !== USER_STATUS.IDENTITY_VERIFIED) && (
                            <Button
                                variant="header"
                                disabled={true}
                                onClick={onToHomepage}
                            >
                                Back to homepage
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Toolbar>
    );
};

NavBar.propTypes = {
    loading: PropTypes.bool,
    userIsAuthenticated: PropTypes.bool,
    userStatus: PropTypes.string,
    walletBalance: PropTypes.string,
    onToHomepage: PropTypes.func,
    onYourRooftop: PropTypes.func,
    onTransaction: PropTypes.func,
    onDocuments: PropTypes.func,
    onAvailablePanels: PropTypes.func,
    onAccount: PropTypes.func,
    onWallet: PropTypes.func,
};

NavBar.defaultProps = {
    loading: false,
    userIsAuthenticated: false,
    userStatus: null,
    walletBalance: null,
    onToHomepage: () => {},
    onYourRooftop: () => {},
    onTransaction: () => {},
    onDocuments: () => {},
    onAvailablePanels: () => {},
    onAccount: () => {},
    onWallet: () => {},
};

export default NavBar;
