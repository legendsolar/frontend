import {useRef} from 'react';
import SideBarNavView from 'views/side_bar_view';
import {Stack, Paper, Typography} from '@mui/material';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import {useAuth} from 'hooks/use_auth';
import MemberHeader from 'components/user/member_header';
import TransferGrid from 'components/transfers/transfer_grid';
import DefaultComponent from 'components/utils/default_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import {useUser} from 'hooks/use_user';

const TransactionPage = (props) => {
    const auth = useAuth();
    const {useUserMetaData} = useUser();
    const user = auth.user;

    const drawerTitles = [
        'Earnings',
        'Investments',
        'Bank Transfers',
        'All Transactions',
    ];

    const contentRefs = useRef([]);

    const {
        loading: userMetaDataLoading,
        firstName,
        lastName,
        info,
    } = useUserMetaData();

    const userName = firstName + ' ' + lastName;
    const userInfo = info;

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
                <ScrollToSidebar
                    header={
                        <MemberHeader
                            name={userName}
                            memberInfo={userInfo}
                        ></MemberHeader>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={4}>
                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Dividend Earnings
                        </Typography>
                        <TransferGrid
                            transfers={recentTransfers}
                        ></TransferGrid>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Bank Transfers
                        </Typography>
                        <TransferGrid
                            transfers={recentTransfers}
                        ></TransferGrid>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investments
                        </Typography>
                        <TransferGrid
                            transfers={recentTransfers}
                        ></TransferGrid>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[3] = el)}
                    >
                        <TransferDataGrid></TransferDataGrid>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
