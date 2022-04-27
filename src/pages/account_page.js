import {useRef} from 'react';
import {useAuth} from 'hooks/use_auth';

import {Paper, Stack, Button, Typography, ListItemButton} from '@mui/material';
import Divider from 'components/basics/divider';
import SideBarNavView from 'views/side_bar_view';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import MemberHeader from 'components/user/member_header';
import TransferGrid from 'components/transfers/transfer_grid';
import {useUser} from 'hooks/use_user';
import DefaultComponent from 'components/utils/default_component';
import ModifyUserInfo from 'components/user/modify_user_info';
import LoadingComponent from 'components/utils/loading_component';
import AccountListComponent from 'components/transfers/account_list_component';

const AccountPage = () => {
    const auth = useAuth();
    const {useUserMetaData} = useUser();

    const contentRefs = useRef([]);

    const drawerTitles = [
        'Personal Information',
        'Connected Accounts',
        'Investment History',
    ];

    const {
        loading: userMetaDataLoading,
        firstName,
        lastName,
        info,
    } = useUserMetaData();

    const userName = firstName + ' ' + lastName;
    const userInfo = info;

    const userInfoInitial = {
        firstName: firstName,
        lastName: lastName,
        streetAddress: ' bla bla ',
        streetAddress2: 'bla bla',
        city: 'bla',
        state: 'WI',
        postalCode: '53536',
    };

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
                <ScrollToSidebar
                    header={
                        <MemberHeader
                            name={userName}
                            memberInfo={userInfo}
                        ></MemberHeader>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                    additionalButtons={
                        <ListItemButton
                            sx={{ml: -4, mr: -4, height: '88px'}}
                            key={'logout'}
                            onClick={() => {
                                auth.signout();
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{fontWeight: '800'}}
                            >
                                Log Out
                            </Typography>
                        </ListItemButton>
                    }
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={6}>
                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Personal Information
                        </Typography>

                        <Divider></Divider>

                        <Typography variant="subtitle2">
                            Mailing Address
                        </Typography>

                        {userMetaDataLoading ? (
                            <LoadingComponent></LoadingComponent>
                        ) : (
                            <ModifyUserInfo
                                initialValues={userInfoInitial}
                                onSubmit={() => {}}
                                isValid={() => {}}
                            ></ModifyUserInfo>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={false}
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Connected Accounts
                        </Typography>
                        <AccountListComponent
                            accounts={userAccounts}
                        ></AccountListComponent>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investment History
                        </Typography>
                        <TransferGrid
                            transfers={recentTransfers}
                        ></TransferGrid>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountPage.propTypes = {};

export default AccountPage;
