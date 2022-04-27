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

const WalletPage = () => {
    const auth = useAuth();

    const contentRefs = useRef([]);

    const drawerTitles = [
        'Transfer Cash',
        'Connected Bank Accounts',
        'Recent Transactions',
    ];

    const userAccounts = [
        {
            id: '1',
            name: 'Account Nickname',
            source: 'Bank of America',
            institution: 'Legends',
            mask: '1234',
            type: 'Checking',
        },
        {
            id: '2',
            name: 'Emergency Checking',
            source: 'Chase',
            institution: 'Legends',
            mask: '1234',
            type: 'Checking',
        },
        {
            id: '3',
            name: 'Money Pile Savings',
            source: 'Union Credit',
            institution: 'Legends',
            mask: '1234',
            type: 'Savings',
        },
    ];

    const recentTransfers = [
        {
            title: 'Test Title',
            amount: '50.00',
            source: 'Source Account',
            destination: 'Destination Account',
            date: new Date(),
            status: 'Complete',
            color: 'legendaryGreen',
        },
        {
            title: 'Test Title',
            amount: '50.00',
            source: 'Source Account',
            destination: 'Destination Account',
            date: new Date(),
            status: 'In Progress',
            color: 'pencilYellow',
        },
        {
            title: 'Test Title',
            amount: '50.00',
            source: 'Source Account',
            destination: 'Destination Account',
            date: new Date(),
            status: 'Failed',
            color: 'eraserRed',
        },
        {
            title: 'Test Title',
            amount: '50.00',
            source: 'Source Account',
            destination: 'Destination Account',
            date: new Date(),
            status: 'Status',
            color: 'legendaryGreen',
        },
    ];

    return (
        <SideBarNavView
            drawer={
                <SideBar>
                    <CreateTransferComponent
                        accounts={userAccounts}
                        loading={false}
                        onComplete={() => {}}
                    ></CreateTransferComponent>
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

                        <TransferGrid
                            transfers={recentTransfers}
                        ></TransferGrid>
                    </DefaultComponent>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <AccountListComponent
                            accounts={userAccounts}
                        ></AccountListComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

WalletPage.propTypes = {};

export default WalletPage;
