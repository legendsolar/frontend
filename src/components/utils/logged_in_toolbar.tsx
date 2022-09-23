import {Stack, Button, Typography, SwipeableDrawer} from '@mui/material';
import {WalletIcon} from 'components/icons/icons';
import {ROUTES} from 'routes/routes';
import LoadingText from './loading_text';
import {useState} from 'react';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import {CircledIcon} from 'components/icons/icons';
import {IconButton} from '@mui/material';
import {BankIcon} from 'components/icons/emoji_icons';
import TypewriterText from './typewriter_text';
const LoggedInToolbar = ({
    loading,
    onYourRooftop,
    onTransaction,
    onDocuments,
    onAvailablePanels,
    onAccount,
    onWallet,
    onLogOut,
    walletBalance,
    currentState,
    constrained,
}) => {
    const [expanded, setExpanded] = useState(false);

    const headers = [
        {
            text: 'Your Rooftop',
            onClick: onYourRooftop,
            state: ROUTES.USER_HOME,
        },
        {
            text: 'Transactions',
            onClick: onTransaction,
            state: ROUTES.TRANSACTIONS,
        },
        {
            text: 'Documents',
            onClick: onDocuments,
            state: ROUTES.DOCUMENTS,
        },
        {
            text: 'Available Panels',
            onClick: onAvailablePanels,
            state: ROUTES.DISCOVER,
        },
        {
            text: 'Account',
            onClick: onAccount,
            state: ROUTES.ACCOUNT,
            outline: true,
        },
        {
            text: 'Legends Wallet',
            onClick: onWallet,
            state: ROUTES.WALLET,
            wallet: true,
        },
    ];

    const renderHeader = (header) => {
        if (header.wallet && !constrained) {
            return (
                <Stack
                    sx={{width: '175px', alignItems: 'flex-end'}}
                    spacing={1}
                >
                    <Typography
                        display="inline"
                        variant={
                            ROUTES.WALLET === currentState
                                ? ('monoButtonBold' as any)
                                : ('monoButton' as any)
                        }
                        sx={{
                            lineHeight: '12px',
                        }}
                    >
                        Legends Wallet
                    </Typography>
                    <Button
                        variant={'header-filled' as any}
                        sx={{
                            mt: 0,
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '175px',
                            p: 4,
                        }}
                        onClick={onWallet}
                    >
                        <WalletIcon />
                        {loading ? <TypewriterText /> : '$' + walletBalance}
                    </Button>
                </Stack>
            );
        }

        return (
            <Button
                variant={
                    header.outline && !constrained
                        ? ('header-outlined' as any)
                        : ('header' as any)
                }
                onClick={header.onClick}
            >
                <Typography
                    variant={
                        header.state === currentState
                            ? ('monoButtonBold' as any)
                            : ('monoButton' as any)
                    }
                >
                    {header.text}
                </Typography>
            </Button>
        );
    };

    if (!constrained) {
        return (
            <Stack direction="row" alignItems={'flex-end'}>
                {headers.map(renderHeader)}
            </Stack>
        );
    }

    const icon = (
        <Button
            sx={{justifyContent: 'center', display: 'flex', minWidth: '25px'}}
            onClick={() => {
                setExpanded(!expanded);
            }}
        >
            <CircledIcon
                icon={expanded ? <CancelSharpIcon /> : <MenuSharpIcon />}
            ></CircledIcon>
        </Button>
    );

    return (
        <Stack direction="row" alignItems={'center'}>
            {headers
                .filter((header) => header.state === currentState)
                .map(renderHeader)}

            {icon}
            <SwipeableDrawer
                anchor="right"
                open={expanded}
                onClose={() => {
                    setExpanded(false);
                }}
                onOpen={() => {}}
            >
                <Stack
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{height: '100%'}}
                >
                    <Stack alignItems={'center'}>
                        {headers.map(renderHeader)}
                        {icon}
                    </Stack>

                    <Button variant={'header' as any} onClick={onLogOut}>
                        <Typography variant={'monoButtonBold' as any}>
                            {'Log Out'}
                        </Typography>
                    </Button>
                </Stack>
            </SwipeableDrawer>
        </Stack>
    );
};

export default LoggedInToolbar;
