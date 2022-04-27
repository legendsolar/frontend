import {
    List,
    ListItem,
    Stack,
    Typography,
    Button,
    ListItemButton,
} from '@mui/material';
import {useState} from 'react';
import Divider from 'components/basics/divider';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const accountNumberString = '•••• •••• •••• ';

const AccountListComponent = ({
    accounts,
    onCreateTransfer,
    onUnlinkAccount,
    onAddAccount,
}) => {
    const [mode, setMode] = useState('normal');
    const [selectedUnlinkAccount, setSelectedUnlinkAccount] = useState(null);

    const onEditButton = () => {
        console.log('edit' + mode);
        if (mode === 'normal') {
            setMode('edit');
        } else {
            setMode('normal');
        }
    };

    const onTransferUnlinkButton = (account) => {
        if (mode === 'normal') {
            onCreateTransfer(account);
        } else {
            setSelectedUnlinkAccount(account);
            setMode('confirm');
        }
    };

    const onUnlinkButton = () => {
        onUnlinkAccount(selectedUnlinkAccount);
        // TODO loading
        setMode('normal');
    };

    const onCancelUnlink = () => {
        setMode('normal');
    };

    const content =
        mode === 'confirm' ? (
            <Stack sx={{mt: 4}}>
                <Typography variant="headline2">{`Are you sure you want to unlink your ${selectedUnlinkAccount.type} account ending in ${selectedUnlinkAccount.mask}?`}</Typography>

                <Stack direction={'row'} sx={{width: '100%'}}>
                    <Button variant="primary" onClick={onUnlinkButton}>
                        Unlink
                    </Button>
                    <Button
                        variant="primary"
                        color="whiteFog"
                        onClick={onCancelUnlink}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        ) : (
            <div>
                {accounts.map((account, index) => (
                    <div key={index}>
                        <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            sx={{m: 4}}
                        >
                            <Stack>
                                <Stack direction="row">
                                    <Typography variant="smallLabel">
                                        {account.type}
                                    </Typography>
                                    <Typography variant="smallLabel">
                                        {accountNumberString + account.mask}
                                    </Typography>
                                </Stack>
                                <Typography variant="headline2">
                                    {account.name}
                                </Typography>
                            </Stack>

                            <Stack justifyContent={'center'}>
                                <Button
                                    variant="bubble"
                                    sx={{
                                        color:
                                            mode === 'normal'
                                                ? 'legendaryGreen.main'
                                                : 'eraserRed.main',
                                    }}
                                    onClick={() =>
                                        onTransferUnlinkButton(account)
                                    }
                                >
                                    {mode === 'normal' ? 'Transfer' : 'Unlink'}
                                </Button>
                            </Stack>
                        </Stack>

                        <Divider></Divider>
                    </div>
                ))}

                <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{mt: 4}}
                >
                    <Button
                        variant={'mono'}
                        sx={{color: 'grassGreen.main'}}
                        onClick={onAddAccount}
                    >
                        Add new account
                    </Button>
                </Stack>
            </div>
        );

    return (
        <div>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant="smallHeadline">
                    {mode === 'confirm'
                        ? 'Confirm unlink'
                        : 'Connected Accounts'}
                </Typography>
                <IconButton onClick={onEditButton} sx={{fontSize: '18px'}}>
                    {mode === 'normal' ? (
                        <EditIcon></EditIcon>
                    ) : (
                        <CloseIcon></CloseIcon>
                    )}
                </IconButton>
            </Stack>

            <Divider sx={{mt: 4}}></Divider>

            {content}
        </div>
    );
};

AccountListComponent.propTypes = {
    accounts: PropTypes.array.isRequired,
    onAddAccount: PropTypes.func,
    onCreateTransfer: PropTypes.func,
    onUnlinkAccount: PropTypes.func,
};

AccountListComponent.defaultProps = {
    onAddAccount: () => {},
    onCreateTransfer: () => {},
    onUnlinkAccount: () => {},
};

export default AccountListComponent;
