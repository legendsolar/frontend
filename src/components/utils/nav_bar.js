import {Button, Stack, Typography, Toolbar, Box, AppBar} from '@mui/material';
import LegendsSolarLogo from 'components/icons/legends_solar_logo';
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
                                disabled={false}
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
