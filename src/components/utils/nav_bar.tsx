import {Button, Stack, Typography, Toolbar, Box, AppBar} from '@mui/material';
import LegendsLogoLight from 'components/icons/legends_logo_light';
import LegendsLogoDark from 'components/icons/legends_logo_dark';
import LegendsSolarLogo from 'components/icons/legends_logo_light';
import PropTypes from 'prop-types';
import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';
import CreateAccountToolbar from './create_account_toolbar';
import LoggedOutToolbar from './logged_out_toolbar';
import LoggedInToolbar from './logged_in_toolbar';
import TypemarkSolarSVG from 'assets/logos/typemark_solar_dark.svg';

export interface NavBarProps {
    loading: boolean;
    userIsAuthenticated: boolean;
    userVerified: boolean;
    walletBalance: string;
    onToHomepage(): void;
    onYourRooftop(): void;
    onTransaction(): void;
    onDocuments(): void;
    onAvailablePanels(): void;
    onAccount(): void;
    onWallet(): void;
}

const NavBar = ({
    loading,
    userIsAuthenticated,
    userVerified,
    walletBalance,
    onToHomepage,
    onYourRooftop,
    onTransaction,
    onDocuments,
    onAvailablePanels,
    onAccount,
    onWallet,
}: NavBarProps) => {
    const backgroundColor = userIsAuthenticated ? 'whiteFog.main' : 'none';
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
                            ml: 16,
                            mr: 14,
                            mt: 10,
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
                            <img
                                src={TypemarkSolarSVG}
                                style={{width: '175px'}}
                            ></img>

                            {userIsAuthenticated && userVerified && (
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

                            {userIsAuthenticated && !userVerified && (
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

export default NavBar;
