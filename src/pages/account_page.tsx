import {useEffect, useRef, useState} from 'react';
import NavBar from 'components/utils/nav_bar';
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
import Component from 'components/basics/component';
import ModifyUserInfo from 'components/user/modify_user_info';
import LoadingComponent from 'components/basics/loading_component';
import AccountListComponent from 'components/transfers/account_list_component';
import useNavBar from 'hooks/use_nav_bar';
import DefaultView from 'views/default_view';
import ComponentDivider from 'components/basics/component_divider';
import AccreditationStatus from 'components/user/accreditation_status';
import {ACCREDITATION_OPTIONS} from 'content/verify_accreditation_content';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {transformValuesToUserAddress} from 'components/utils/transformers';
import LoadingText from 'components/utils/loading_text';

const AccountPage = () => {
    const navBarProps = useNavBar();
    const auth = useAuth();
    const {useUserMetaData, useGetUserAccreditation, useSetUser} = useUser();
    const {setUser, loading} = useSetUser();

    const {
        loading: accreditationLoading,
        error: accreditationError,
        accreditation,
    } = useGetUserAccreditation();

    const {
        useAccounts,
        usePlaidLinkModal,
        useCreateLinkToken,
        useCreateAccount,
    } = useAccount();

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
        if (!createLinkTokenLoading && !token) createLinkToken();
    }, [createLinkTokenLoading, token]);

    const {open, ready} = usePlaidLinkModal(token, onPlaidLinkComplete);

    const contentRefs = useRef<Array<unknown>>([]);

    const drawerTitles = [
        'Personal Information',
        'Accreditation',
        'Connected Accounts',
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

    const [userDataEditMode, setUserDataEditMode] = useState<boolean>(false);
    const [userDataEditValid, setUserDataEditValid] = useState<boolean>(false);
    const [values, setValues] = useState<any>({});

    const onUpdateUserAddress = async () => {
        await setUser({
            variables: {
                input: {
                    address: transformValuesToUserAddress(values),
                },
            },
        });
        setUserDataEditMode(false);
        setUserDataEditValid(false);
    };

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <SideBarNavView
                drawer={
                    <ScrollToSidebar
                        header={
                            <MemberHeader
                                name={userName}
                                memberInfo={userInfo}
                                sx={{}}
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
                        <Component
                            standardWidth={false}
                            ref={(el) => (contentRefs.current[0] = el)}
                        >
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{mb: 2}}
                            >
                                <Typography variant={'smallHeadline' as any}>
                                    Personal Information
                                </Typography>

                                <IconButton
                                    onClick={() => {
                                        setUserDataEditMode(!userDataEditMode);
                                    }}
                                    sx={{fontSize: '18px'}}
                                >
                                    {!userDataEditMode ? (
                                        <EditIcon></EditIcon>
                                    ) : (
                                        <CloseIcon></CloseIcon>
                                    )}
                                </IconButton>
                            </Stack>

                            <ComponentDivider></ComponentDivider>

                            <Typography variant="subtitle2">
                                Mailing Address
                            </Typography>

                            {userMetaDataLoading ? (
                                <LoadingComponent></LoadingComponent>
                            ) : (
                                <ModifyUserInfo
                                    initialValues={userInfoInitial}
                                    onSubmit={() => {}}
                                    isValid={(valid) =>
                                        setUserDataEditValid(valid)
                                    }
                                    disabled={!userDataEditMode}
                                    handleChange={(values) => setValues(values)}
                                    userVerified={navBarProps.userVerified}
                                ></ModifyUserInfo>
                            )}

                            {userDataEditMode && (
                                <Button
                                    variant={'primary' as any}
                                    disabled={!userDataEditValid}
                                    onClick={onUpdateUserAddress}
                                >
                                    {loading ? (
                                        <LoadingText></LoadingText>
                                    ) : (
                                        'Update Address'
                                    )}
                                </Button>
                            )}
                        </Component>

                        <Component
                            disabled={false}
                            standardWidth={false}
                            ref={(el) => (contentRefs.current[1] = el)}
                        >
                            <Typography variant={'smallHeadline' as any}>
                                Accreditation
                            </Typography>

                            <ComponentDivider></ComponentDivider>
                            <AccreditationStatus
                                options={ACCREDITATION_OPTIONS.filter(
                                    (option) =>
                                        accreditation
                                            ? accreditation?.includes(
                                                  option.accreditationOption,
                                              )
                                            : false,
                                )}
                            ></AccreditationStatus>
                        </Component>

                        <Component
                            disabled={false}
                            standardWidth={false}
                            ref={(el) => (contentRefs.current[2] = el)}
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
                        </Component>
                    </Stack>
                }
            ></SideBarNavView>
        </DefaultView>
    );
};

AccountPage.propTypes = {};

export default AccountPage;
