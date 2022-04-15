import {useRef, useEffect} from 'react';
import {useAuth} from 'hooks/use_auth';

import {Paper, Stack, Button, Typography} from '@mui/material';
import SideBarNavView from 'views/side_bar_view';

import AccountListComponent from 'components/transfers/account_list_component';
import CreateTransferComponent from 'components/transfers/create_transfer_component';

import {useDispatch, useSelector} from 'react-redux';
import {selectWalletBalance} from 'slices/wallet_slice';
import {fetchWalletBalance} from 'slices/wallet_slice';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import RecentTransfers from 'components/transfers/recent_transfers';
import DefaultComponent from 'components/utils/default_component';
import SideBar from 'components/utils/sidebar_component';

const TransferPage = () => {
    const auth = useAuth();
    const cloudFunctions = useCloudFunctions();
    const dispatch = useDispatch();
    const user = auth.user;

    const balanceStatus = useSelector((state) => state.wallet.balance.status);
    const walletBalance = useSelector(selectWalletBalance);

    const balance = walletBalance ? walletBalance : '0.00';

    useEffect(() => {
        if (balanceStatus === 'idle') {
            console.log('dispatch wallet: line 36, transfer page');
            dispatch(fetchWalletBalance(cloudFunctions));
        }
    }, [balanceStatus, dispatch]);

    const contentRefs = useRef([]);

    const drawerTitles = [
        'Transfer Cash',
        'Connected Bank Accounts',
        'Recent Transactions',
    ];

    return (
        <SideBarNavView
            drawer={
                <SideBar>
                    <CreateTransferComponent></CreateTransferComponent>
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
                        <RecentTransfers></RecentTransfers>
                    </DefaultComponent>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Connected Accounts
                        </Typography>
                        <AccountListComponent></AccountListComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

TransferPage.propTypes = {};

export default TransferPage;
