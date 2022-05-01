import {useRef, useEffect} from 'react';
import {useAuth} from 'hooks/use_auth';

import {Paper, Stack, Button, Typography} from '@mui/material';
import SideBarNavView from 'views/side_bar_view';

import CreateTransferComponent from 'components/transfers/create_transfer_component';

import {useDispatch, useSelector} from 'react-redux';
import {selectWalletBalance} from 'slices/wallet_slice';
import {fetchWalletBalance} from 'slices/wallet_slice';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import DefaultComponent from 'components/utils/default_component';
import SideBar from 'components/utils/sidebar_component';
import TransferGrid from 'components/transfers/transfer_grid';
import AccountListComponent from 'components/transfers/account_list_component';

import {useTransfer} from 'hooks/use_transfer';
import {useAccount} from 'hooks/use_accounts';

const WalletPage = () => {
    const {useAccounts, useWallet} = useAccount();
    const {useRecentTransfers} = useTransfer();
    const contentRefs = useRef([]);

    const {
        loading: accountsLoading,
        error: accountsError,
        accounts,
    } = useAccounts();

    const {loading: walletLoading, error: walletError, wallet} = useWallet();

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(5);

    const accountsWithWallet = accounts && wallet ? [...accounts, wallet] : [];

    return (
        <SideBarNavView
            drawer={
                <SideBar>
                    {!accountsLoading && !walletLoading && (
                        <CreateTransferComponent
                            accounts={accountsWithWallet}
                            loading={false}
                            onComplete={() => {}}
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
