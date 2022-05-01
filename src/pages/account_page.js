import {useEffect, useRef} from 'react';
import {useAuth} from 'hooks/use_auth';
import {useAccount} from 'hooks/use_accounts';
import {useTransfer} from 'hooks/use_transfer';

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
    const {
        useAccounts,
        usePlaidLinkModal,
        useCreateLinkToken,
        useCreateAccount,
    } = useAccount();
    const {useTransfersByType} = useTransfer();

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
        }).then((account) => {
            // new account
            console.log({account});
        });
    };

    useEffect(() => {
        if (!createLinkTokenLoading && !token) createLinkToken();
    }, [createLinkTokenLoading, token]);

    console.log({linkToken: token});

    const {open, ready} = usePlaidLinkModal(token, onPlaidLinkComplete);

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
        streetAddress,
        streetAddress2,
        city,
        postalCode,
        state,
    } = useUserMetaData();

    const userName = firstName + ' ' + lastName;
    const userInfo = info;

    const userInfoInitial = {
        firstName,
        lastName,
        streetAddress,
        streetAddress2,
        city,
        state,
        postalCode,
    };

    const {
        loading: accountsLoading,
        error: accountsError,
        accounts,
    } = useAccounts();

    const {
        loading: investmentTransferLoading,
        error: investmentError,
        transfers: investmentTransfers,
    } = useTransfersByType('INVESTMENT', 4);

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
                        {!accountsLoading && (
                            <AccountListComponent
                                accounts={accounts}
                                onCreateTransfer={(account) => {}}
                                onAddAccount={ready ? open : () => {}}
                                onUnlinkAccount={() => {}}
                                addAccountDisabled={
                                    accountsLoading ||
                                    createLinkTokenLoading ||
                                    createAccountLoading
                                }
                            ></AccountListComponent>
                        )}
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investment History
                        </Typography>
                        {!investmentTransferLoading && (
                            <TransferGrid
                                transfers={investmentTransfers}
                            ></TransferGrid>
                        )}
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountPage.propTypes = {};

export default AccountPage;
