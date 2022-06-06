import {useRef, useEffect, useState} from 'react';
import {useAuth} from 'hooks/use_auth';

import {Paper, Stack, Button, Typography} from '@mui/material';
import SideBarNavView from 'views/side_bar_view';

import CreateTransferComponent from 'components/transfers/create_transfer_component';
import DefaultComponent from 'components/utils/default_component';
import SideBar from 'components/utils/sidebar_component';
import TransferGrid from 'components/transfers/transfer_grid';
import AccountListComponent from 'components/transfers/account_list_component';

import {useTransfer} from 'hooks/use_transfer';
import {useAccount} from 'hooks/use_accounts';

const WalletPage = () => {
    const {
        useAccounts,
        useWallet,
        usePlaidLinkModal,
        useCreateLinkToken,
        useCreateAccount,
        useDeleteAccount,
    } = useAccount();

    const {useRecentTransfers, useCreateTransfer} = useTransfer();
    const contentRefs = useRef([]);
    const [tokenRequested, setTokenRequested] = useState(false);

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
        transfer: newTransfer,
        createTransfer,
    } = useCreateTransfer();

    const onCreateNewTransfer = (transfer) => {
        console.log(transfer);
        const variables = {
            input: {
                amount: transfer.amount,
                sourceAccountId: transfer.sourceAccount.id,
                destinationAccountId: transfer.destinationAccount.id,
            },
        };

        createTransfer({
            variables,
        });
    };

    const onDeleteAccount = (account) => {
        return deleteAccount({
            variables: {
                input: {
                    accountId: account.id,
                },
            },
        });
    };

    const {
        createLinkToken,
        loading: createLinkTokenLoading,
        error: createLinkTokenError,
        token,
    } = useCreateLinkToken();

    const {
        createAccount,
        loading: createAccountLoading,
        error: createAccoutError,
        account,
    } = useCreateAccount();

    const onPlaidLinkComplete = ({publicToken, metadata}) => {
        console.log({publicToken, metadata});
        const account = metadata.account;
        // create account
        createAccount({
            variables: {
                input: {
                    publicToken: publicToken,
                    plaidId: account.id,
                    institution: metadata.institution.name,
                    name: account.name,
                    type: account.subtype.toUpperCase(),
                    mask: account.mask,
                },
            },
        });
    };

    useEffect(() => {
        if (!createLinkTokenLoading && !token && !tokenRequested) {
            setTokenRequested(true);
            createLinkToken();
        }
    }, [createLinkTokenLoading, token, tokenRequested]);

    const {open, ready} = usePlaidLinkModal(token, onPlaidLinkComplete);

    const accountsWithWallet = accounts && wallet ? [...accounts, wallet] : [];

    return (
        <SideBarNavView
            drawer={
                <SideBar>
                    {!accountsLoading && !walletLoading && (
                        <CreateTransferComponent
                            accounts={accountsWithWallet}
                            loading={newTransferLoading}
                            onComplete={onCreateNewTransfer}
                        ></CreateTransferComponent>
                    )}
                </SideBar>
            }
            mainContent={
                <Stack spacing={4}>
                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Recent Transfers
                        </Typography>

                        {!recentTransfersLoading && (
                            <TransferGrid
                                transfers={recentTransfers}
                            ></TransferGrid>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        {!accountsLoading && (
                            <AccountListComponent
                                accounts={accounts}
                                onCreateTransfer={(account) => {}}
                                onAddAccount={ready ? open : () => {}}
                                onUnlinkAccount={onDeleteAccount}
                                addAccountDisabled={
                                    accountsLoading ||
                                    createLinkTokenLoading ||
                                    createAccountLoading
                                }
                            ></AccountListComponent>
                        )}
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

WalletPage.propTypes = {};

export default WalletPage;
