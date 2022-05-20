import {useEffect, useRef, useState} from 'react';
import SideBarNavView from 'views/side_bar_view';
import {Stack, Paper, Typography} from '@mui/material';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import {useAuth} from 'hooks/use_auth';
import MemberHeader from 'components/user/member_header';
import TransferGrid from 'components/transfers/transfer_grid';
import DefaultComponent from 'components/utils/default_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import TransferPlaceholder from 'components/placeholders/transfer_placeholder';
import {useUser} from 'hooks/use_user';
import {useTransfer} from 'hooks/use_transfer';

const TransactionPage = (props) => {
    const auth = useAuth();
    const {useUserMetaData} = useUser();
    const {useTransfersByType, useRecentTransfers} = useTransfer();
    const [emptyTransfers, setEmptyTransfers] = useState(false);
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

    const {
        loading: dividendTransferLoading,
        error: dividendError,
        transfers: dividendTransfers,
    } = useTransfersByType('DIVIDEND', 4);

    const {
        loading: investmentTransferLoading,
        error: investmentError,
        transfers: investmentTransfers,
    } = useTransfersByType('INVESTMENT', 4);

    const {
        loading: transferTransferLoading,
        error: transferError,
        transfers: transferTransfers,
    } = useTransfersByType('TRANSFER', 4);

    const {
        loading: recentTransfersLoading,
        error: recentError,
        transfers: recentTransfers,
    } = useRecentTransfers(15);

    useEffect(() => {
        if (!recentTransfersLoading && !recentTransfers.length) {
            setEmptyTransfers(true);
        } else {
            setEmptyTransfers(false);
        }
    }, [recentTransfers, recentTransfersLoading]);

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
                    {emptyTransfers && (
                        <TransferPlaceholder></TransferPlaceholder>
                    )}

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Dividend Earnings
                        </Typography>
                        {!dividendTransferLoading && (
                            <TransferGrid
                                transfers={dividendTransfers}
                            ></TransferGrid>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Bank Transfers
                        </Typography>
                        {!transferTransferLoading && (
                            <TransferGrid
                                transfers={transferTransfers}
                            ></TransferGrid>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investments
                        </Typography>
                        {!investmentTransferLoading && (
                            <TransferGrid
                                transfers={investmentTransfers}
                            ></TransferGrid>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[3] = el)}
                    >
                        {!recentTransfersLoading && (
                            <TransferDataGrid
                                transfers={recentTransfers}
                            ></TransferDataGrid>
                        )}
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
