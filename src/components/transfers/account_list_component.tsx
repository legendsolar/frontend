import {Stack, Typography, Button} from '@mui/material';
import {useState} from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ComponentDivider from 'components/basics/component_divider';
import {Account} from 'schema/schema_gen_types';

const accountNumberString = '•••• •••• •••• ';

interface AccountListComponentProps {
    accounts: Array<Account>;
    onCreateTransfer(account: Account): void;
    onUnlinkAccount(account: Account): void;
    onAddAccount(): void;
    addAccountDisabled: boolean;
}

const AccountListComponent = ({
    accounts,
    onCreateTransfer,
    onUnlinkAccount,
    onAddAccount,
    addAccountDisabled,
}: AccountListComponentProps) => {
    const [mode, setMode] = useState<string>('normal');
    const [selectedUnlinkAccount, setSelectedUnlinkAccount] =
        useState<Account>();

    const onEditButton = () => {
        if (mode === 'normal') {
            setMode('edit');
        } else {
            setMode('normal');
        }
    };

    const onTransferUnlinkButton = (account: Account) => {
        if (mode === 'normal') {
            onCreateTransfer(account);
        } else {
            setSelectedUnlinkAccount(account);
            setMode('confirm');
        }
    };

    const onUnlinkButton = () => {
        if (selectedUnlinkAccount) {
            onUnlinkAccount(selectedUnlinkAccount);
        }
        // TODO loading
        setMode('normal');
    };

    const onCancelUnlink = () => {
        setMode('normal');
    };

    const accountContent = accounts ? (
        accounts.map((account, index) => (
            <div key={index}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{m: 4}}
                >
                    <Stack>
                        <Stack direction="row">
                            <Typography variant={'smallLabel' as any}>
                                {account.type}
                            </Typography>
                            <Typography variant={'smallLabel' as any}>
                                {accountNumberString + account?.mask}
                            </Typography>
                        </Stack>
                        <Typography variant={'headline2' as any}>
                            {account.name}
                        </Typography>
                    </Stack>

                    <Stack justifyContent={'center'}>
                        <Button
                            variant={'bubble' as any}
                            sx={{
                                color:
                                    mode === 'normal'
                                        ? 'legendaryGreen.main'
                                        : 'eraserRed.main',
                            }}
                            onClick={() => onTransferUnlinkButton(account)}
                        >
                            {mode === 'normal' ? 'Transfer' : 'Unlink'}
                        </Button>
                    </Stack>
                </Stack>

                <ComponentDivider></ComponentDivider>
            </div>
        ))
    ) : (
        <Typography>No accounts</Typography>
    );

    const content =
        mode === 'confirm' ? (
            <Stack sx={{mt: 4}}>
                <Typography
                    variant={'headline2' as any}
                >{`Are you sure you want to unlink your ${selectedUnlinkAccount?.type} account ending in ${selectedUnlinkAccount?.mask}?`}</Typography>

                <Stack direction={'row'} sx={{width: '100%'}}>
                    <Button variant={'primary' as any} onClick={onUnlinkButton}>
                        Unlink
                    </Button>
                    <Button
                        variant={'primary' as any}
                        color={'whiteFog' as any}
                        onClick={onCancelUnlink}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        ) : (
            <div>
                {accountContent}
                <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{mt: 4}}
                >
                    <Button
                        variant={'mono' as any}
                        sx={{color: 'grassGreen.main'}}
                        onClick={onAddAccount}
                        disabled={addAccountDisabled}
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
                sx={{mb: 2}}
            >
                <Typography variant={'smallHeadline' as any}>
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

            <ComponentDivider></ComponentDivider>

            {content}
        </div>
    );
};

export default AccountListComponent;
