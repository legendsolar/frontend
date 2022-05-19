import {Stack, Button, Typography} from '@mui/material';

const LoggedInToolbar = ({
    onYourRooftop,
    onTransaction,
    onDocuments,
    onAvailablePanels,
    onAccount,
    onWallet,
    walletBalance,
}) => {
    return (
        <Stack direction="row" alignItems={'flex-end'}>
            <Button variant="header" onClick={onYourRooftop}>
                <Typography variant="appBarHeader">Your Rooftop</Typography>
            </Button>

            <Button variant="header" onClick={onTransaction}>
                <Typography variant="appBarHeader">Transactions</Typography>
            </Button>

            <Button variant="header" onClick={onDocuments}>
                <Typography variant="appBarHeader">Documents</Typography>
            </Button>

            <Button variant="header" onClick={onAvailablePanels}>
                <Typography variant="appBarHeader">Available Panels</Typography>
            </Button>

            <Button variant="header-outlined" onClick={onAccount}>
                <Typography variant="appBarHeader">Account</Typography>
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
                <Button variant="header-filled" sx={{mt: 0}} onClick={onWallet}>
                    {'$' + (walletBalance ? walletBalance : '-')}
                </Button>
            </Stack>
        </Stack>
    );
};

export default LoggedInToolbar;
