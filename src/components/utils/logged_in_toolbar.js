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
                <Typography variant="monoButton">Your Rooftop</Typography>
            </Button>

            <Button variant="header" onClick={onTransaction}>
                <Typography variant="monoButton">Transactions</Typography>
            </Button>

            <Button variant="header" onClick={onDocuments}>
                <Typography variant="monoButton">Documents</Typography>
            </Button>

            <Button variant="header" onClick={onAvailablePanels}>
                <Typography variant="monoButton">Available Panels</Typography>
            </Button>

            <Button variant="header-outlined" onClick={onAccount}>
                <Typography variant="monoButton">Account</Typography>
            </Button>

            <Stack sx={{width: '175px'}} spacing={1}>
                <Typography
                    display="inline"
                    variant="monoButton"
                    sx={{
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
