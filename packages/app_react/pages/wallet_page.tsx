import {useRef, useEffect, useState} from 'react';
import {useAuth} from 'hooks/use_auth';

import {Paper, Stack, Button, Typography} from '@mui/material';
import SideBarNavView from 'views/side_bar_view';

import CreateTransferComponent from '../transfers/create_transfer_component';
import Component from '../basics/component';
import SideBar from '../utils/sidebar_component';
import TransferGrid from '../transfers/transfer_grid';
import AccountListComponent from '../transfers/account_list_component';

import {useTransfer} from 'hooks/use_transfer';
import {useAccount} from 'hooks/use_accounts';

import useNavBar from 'hooks/use_nav_bar';
import NavBar from '../utils/nav_bar';
import DefaultView from 'views/default_view';
import {
    BankAccount,
    CreateAccountInput,
    CreateTransferInput,
} from 'schema/schema_gen_types';
import {
    transformPlaidDataToCreateAccountInput,
    transformPlaidVerificationStatus,
} from 'transformers/plaid_api_transformers';
import RecentTransfersComponent from '../transfers/recent_transfers_component';
import {transferTransformer} from '../transfers/transfer_transforms';
import {usePlaid} from 'hooks/use_plaid';

const WalletPage = () => {
    const navBarProps = useNavBar();
    const {useAccounts, useWallet, useCreateLinkToken, useDeleteAccount} =
        useAccount();

    const {useRecentTransfers, useCreateTransfer} = useTransfer();
    const [tokenRequested, setTokenRequested] = useState(false);
    const [openRequested, setOpenRequested] = useState(false);

    const {
        loading: accountsLoading,
        error: accountsError,
        accounts,
    } = useAccounts();

    const {deleteAccount} = useDeleteAccount();

    const {loading: walletLoading, error: walletError, wallet} = useWallet();

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(4);

    const {
        loading: newTransferLoading,
        error: newTransferError,
        reset: resetTransferCreation,
        transfer: newTransfer,
        createTransfer,
    } = useCreateTransfer();

    const {usePlaidLinkModal, loading: plaidLoading} = usePlaid();

    const onCreateNewTransfer = (newTransfer: CreateTransferInput) => {
        // const variables = {
        //     input: {
        //         amount: newTransfer.amount,
        //         sourceAccountId: newTransfer.sourceAccountId,
        //         destinationAccountId: newTransfer.destinationAccountId,
        //     },
        // };

        createTransfer(newTransfer);
    };

    const onDeleteAccount = (account) => {
        return deleteAccount({
            accountId: account?.id,
        });
    };

    const {
        createLinkToken,
        loading: createLinkTokenLoading,
        error: createLinkTokenError,
        token,
    } = useCreateLinkToken();

    const onCompleteAccountLink = async (account: BankAccount) => {
        console.log(account.plaid.accessToken);
        await createLinkToken(account.plaid.accessToken);
        setOpenRequested(true);
        // open();
    };

    useEffect(() => {
        if (!createLinkTokenLoading && !token && !tokenRequested) {
            setTokenRequested(true);
            createLinkToken();
        }
    }, [createLinkTokenLoading, token, tokenRequested]);

    const {open, ready} = usePlaidLinkModal(token);

    useEffect(() => {
        if (ready && openRequested) {
            setOpenRequested(false);
            open();
        }
    }, [ready, openRequested]);

    const accountsWithWallet = accounts && wallet ? [...accounts, wallet] : [];

    const contentRefs = useRef<Array<unknown>>([]);

    const displayTransfers = recentTransfers
        ? recentTransfers.map(transferTransformer)
        : [];

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <SideBarNavView
                drawer={
                    <Stack spacing={0} sx={{mt: 4}}>
                        <Typography variant={'monoButton' as any}>
                            Wallet Balance
                        </Typography>
                        <Typography variant={'headline1' as any}>
                            {'$' + navBarProps.walletBalance}
                        </Typography>
                        <SideBar sx={{mt: 0}}>
                            {!accountsLoading && !walletLoading && (
                                <CreateTransferComponent
                                    accounts={accountsWithWallet}
                                    loading={newTransferLoading}
                                    onComplete={onCreateNewTransfer}
                                    maxAmount={
                                        navBarProps?.walletBalance
                                            ? navBarProps.walletBalance
                                            : '0'
                                    }
                                    error={
                                        newTransferError
                                            ? 'Error creating transfer'
                                            : undefined
                                    }
                                    onReset={resetTransferCreation}
                                ></CreateTransferComponent>
                            )}
                        </SideBar>
                    </Stack>
                }
                mainContent={
                    <Stack spacing={4}>
                        <RecentTransfersComponent
                            transfers={displayTransfers}
                            loading={recentTransfersLoading}
                        ></RecentTransfersComponent>

                        <Component
                            standardWidth={false}
                            ref={(el) => (contentRefs.current[1] = el)}
                        >
                            {!accountsLoading && (
                                <AccountListComponent
                                    accounts={accounts}
                                    onCreateTransfer={(account) => {}}
                                    onAddAccount={
                                        ready ? () => open() : () => {}
                                    }
                                    onUnlinkAccount={onDeleteAccount}
                                    onCompleteAccountLink={
                                        onCompleteAccountLink
                                    }
                                    addAccountDisabled={
                                        accountsLoading ||
                                        createLinkTokenLoading ||
                                        plaidLoading
                                    }
                                ></AccountListComponent>
                            )}
                        </Component>
                    </Stack>
                }
                drawerPosition={'right'}
            ></SideBarNavView>
        </DefaultView>
    );
};

WalletPage.propTypes = {};

export default WalletPage;
