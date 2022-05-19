import {Button, Stack, Typography, Toolbar, Box, AppBar} from '@mui/material';
import LegendsLogoLight from 'components/icons/legends_logo_light';
import LegendsLogoDark from 'components/icons/legends_logo_dark';
import LegendsSolarLogo from 'components/icons/legends_logo_light';
import PropTypes from 'prop-types';
import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';
import CreateAccountToolbar from './create_account_toolbar';
import LoggedOutToolbar from './logged_out_toolbar';
import LoggedInToolbar from './logged_in_toolbar';

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
    const backgroundColor = userIsAuthenticated ? 'blackDusk.main' : 'none';
    const headerHeight = '300px';
    return (
        <div>
            <Box
                position="absolute"
                sx={{
                    height: headerHeight,
                    width: '100%',
                    backgroundColor: backgroundColor,
                    zIndex: -1,
                    transform: 'translate3d(0, 0, -5px)',
                }}
            ></Box>
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
                                    minWidth: '120px',
                                    height: '45px',
                                }}
                                alt="logo"
                            >
                                {userIsAuthenticated ? (
                                    <LegendsLogoLight></LegendsLogoLight>
                                ) : (
                                    <LegendsLogoDark></LegendsLogoDark>
                                )}
                            </Box>

                            {userIsAuthenticated &&
                                userStatus ===
                                    USER_STATUS.IDENTITY_VERIFIED && (
                                    <LoggedInToolbar
                                        walletBalance={walletBalance}
                                        onYourRooftop={onYourRooftop}
                                        onTransaction={onTransaction}
                                        onDocuments={onDocuments}
                                        onAvailablePanels={onAvailablePanels}
                                        onAccount={onAccount}
                                        onWallet={onWallet}
                                    ></LoggedInToolbar>
                                )}

                            {userIsAuthenticated &&
                                userStatus !==
                                    USER_STATUS.IDENTITY_VERIFIED && (
                                    <CreateAccountToolbar
                                        onToHomepage={onToHomepage}
                                    ></CreateAccountToolbar>
                                )}

                            {!userIsAuthenticated && (
                                <LoggedOutToolbar></LoggedOutToolbar>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Toolbar>
        </div>
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
