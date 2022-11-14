import {useEffect, useRef, useState} from 'react';
import {NavBar} from '@project/components/nav';
import {useAuth} from '@project/hooks/use_auth';
import {useAccount} from '@project/hooks/use_accounts';
import {useTransfer} from '@project/hooks/use_transfer';

import {
    Paper,
    Stack,
    Button,
    Typography,
    ListItemButton,
    Box,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import SideBarNavView from '../views/side_bar_view';
import {ScrollToSidebar} from '@project/components/nav';
import {MemberHeader} from '@project/components/user/member_header';
import {TransferGrid} from '@project/components/transfers/transfer_grid';
import {useUser} from '@project/hooks/use_user';
import {Component} from '@project/components/basics/component';
import {
    Values,
    ModifyUserInfo,
} from '@project/components/inputs/modify_user_info';
import {LoadingComponent} from '@project/components/basics/loading_component';
import {AccountListComponent} from '@project/components/transfers/account_list_component';
import useNavBar from '@project/hooks/use_nav_bar';
import DefaultView from '../views/default_view';
import {ComponentDivider} from '@project/components/basics/component_divider';
import {AccreditationStatus} from '@project/components/user/accreditation_status';
import {ACCREDITATION_OPTIONS} from '../content/verify_accreditation_content';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {transformValuesToUserAddress} from '../content/create_wallet_content';
import {LoadingText} from '@project/components/utils/loading_text';
import {BankAccount, CreateAccountInput} from '@p/schema';
import {
    transformPlaidDataToCreateAccountInput,
    transformPlaidVerificationStatus,
} from '../transformers/plaid_api_transformers';
import {usePlaid} from '@project/hooks/use_plaid';

const AccountPage = () => {
    const navBarProps = useNavBar();
    const auth = useAuth();
    const {useUserMetaData, useGetUserAccreditation, useSetUser} = useUser();
    const {setUser, loading} = useSetUser();
    const [openRequested, setOpenRequested] = useState(false);

    const {
        loading: accreditationLoading,
        error: accreditationError,
        accreditation,
    } = useGetUserAccreditation();

    const {useAccounts, useCreateLinkToken, useCreateAccount} = useAccount();

    const {usePlaidLinkModal, loading: plaidLoading} = usePlaid();

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
        // create account

        const input = transformPlaidDataToCreateAccountInput(
            publicToken,
            metadata,
        );

        createAccount(input);
    };
    const {open, ready} = usePlaidLinkModal(token);

    useEffect(() => {
        if (!createLinkTokenLoading && !token && !createLinkTokenError)
            createLinkToken();
    }, [createLinkTokenLoading, token, createLinkTokenError]);

    useEffect(() => {
        if (ready && openRequested) {
            setOpenRequested(false);
            open();
        }
    }, [ready, openRequested]);

    const onCompleteAccountLink = async (account: BankAccount) => {
        console.log(account.plaid.accessToken);
        await createLinkToken(account.plaid.accessToken);
        setOpenRequested(true);
        // open();
    };

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

    const userInfoInitial: Values = {
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

    console.log({accounts});

    const [userDataEditMode, setUserDataEditMode] = useState<boolean>(false);
    const [userDataEditValid, setUserDataEditValid] = useState<boolean>(false);
    const [values, setValues] = useState<any>({});

    const onUpdateUserAddress = async () => {
        await setUser({
            address: transformValuesToUserAddress(values),
        });
        setUserDataEditMode(false);
        setUserDataEditValid(false);
    };

    const theme = useTheme();
    const constrained = useMediaQuery(theme.breakpoints.down('xl'));

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <SideBarNavView
                constrainedDrawerPostion="none"
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
                        {constrained && (
                            <MemberHeader
                                name={userName}
                                memberInfo={userInfo}
                            ></MemberHeader>
                        )}

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
                                    onAddAccount={
                                        ready ? () => open() : () => {}
                                    }
                                    onUnlinkAccount={() => {}}
                                    onCompleteAccountLink={
                                        onCompleteAccountLink
                                    }
                                    addAccountDisabled={
                                        accountsLoading ||
                                        createLinkTokenLoading ||
                                        createAccountLoading ||
                                        !!createLinkTokenError
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
