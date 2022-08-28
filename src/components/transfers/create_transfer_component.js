import {
    Stack,
    Button,
    Typography,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useState, useReducer} from 'react';
import ErrorComponent from 'components/errors/error_component';

import {validateTransferAmount} from 'validation/transaction_validation';
import TransferComponent from 'components/transfers/transfer_component';
import MultiSelect from 'components/inputs/multiselect';
import LoadingText from 'components/utils/loading_text';

const CreateTransferComponent = ({
    accounts,
    loading,
    error,
    onComplete,
    onReset,
}) => {
    const [sourceAccount, setSourceAccount] = useState(null);
    const [destinationAccount, setDestinationAccount] = useState(null);
    const [transferAmount, setTransferAmount] = useState(undefined);

    const initialState = {
        page: 'setup',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_VIEW':
                if (action.page === 'setup') {
                    setSourceAccount(null);
                    setDestinationAccount(null);
                    setTransferAmount(null);
                }

                return {
                    ...state,
                    page: action.page,
                    accountSelectType: action.accountSelectType,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const goBack = () => {
        dispatch({
            type: 'CHANGE_VIEW',
            page: 'setup',
        });
    };

    const displayAccounts = accounts
        ? accounts.map((account) => {
              return {...account, text: account.name, value: account.id};
          })
        : [];

    const sourceAccountOptions = accounts
        ? accounts
              .filter((account) => account.type === 'WALLET')
              .map((account) => {
                  return {...account, text: account.name, value: account.id};
              })
        : [];

    const destinationAccountOptions = accounts
        ? accounts
              .filter(
                  (account) =>
                      account.type !== 'WALLET' && account !== sourceAccount,
              )
              .map((account) => {
                  return {...account, text: account.name, value: account.id};
              })
        : [];

    const onAccountSelected = (event) => {
        const {name, value} = event.target;

        const account = displayAccounts.filter(
            (account) => account.id === value,
        )[0];

        if (name === 'sourceAccount') {
            setSourceAccount(account);
        } else if (name === 'destinationAccount') {
            setDestinationAccount(account);
        }
    };

    const transferObject = {
        title: 'New Transfer',
        amount: transferAmount,
        sourceName: sourceAccount?.name,
        sourceAccount,
        destinationName: destinationAccount?.name,
        destinationAccount,
        destinationName: destinationAccount?.name,
        color: state.page === 'review' ? 'legendaryGreen' : 'pencilYellow',
        status: state.page === 'review' ? 'IN REVIEW' : 'PENDING',
        type: 'TRANSFER',
        created: new Date(),
    };

    const accountsEmpty = !accounts || accounts.length === 0;

    if (error) {
        return (
            <Stack spacing={2}>
                <Alert severity="error">{error}</Alert>
                <Button
                    variant="primary"
                    onClick={() => {
                        onReset();
                        goBack();
                    }}
                >
                    {' '}
                    Go Back
                </Button>
            </Stack>
        );
    }

    if (state.page === 'setup') {
        return (
            <Stack spacing={2}>
                <Stack spacing={0}>
                    <Typography variant="smallHeadline">
                        Transfer Cash
                    </Typography>
                    <Typography variant="label">$2,000 maximum</Typography>
                </Stack>

                <TextField
                    name="amount"
                    type="number"
                    label="Amount"
                    value={transferAmount}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    }}
                    onChange={(e) => {
                        const {name, value} = e.target;
                        setTransferAmount(value);
                    }}
                    onBlur={(e) => {
                        const validatedAmount =
                            validateTransferAmount(transferAmount);

                        setTransferAmount(validatedAmount.value);
                    }}
                    disabled={accountsEmpty}
                ></TextField>

                <MultiSelect
                    name={'sourceAccount'}
                    text="From"
                    selected={sourceAccount}
                    fields={sourceAccountOptions}
                    onChangeListener={onAccountSelected}
                    disabled={accountsEmpty}
                ></MultiSelect>

                <MultiSelect
                    name={'destinationAccount'}
                    text="To"
                    selected={destinationAccount}
                    fields={destinationAccountOptions}
                    onChangeListener={onAccountSelected}
                    disabled={accountsEmpty}
                ></MultiSelect>

                <Button
                    variant="primary"
                    disabled={
                        !destinationAccount || !sourceAccount || !transferAmount
                    }
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_VIEW',
                            page: 'review',
                        });
                    }}
                >
                    {' '}
                    Review Transfer
                </Button>

                {accountsEmpty && (
                    <Typography variant="smallLabel">
                        Link an account to transfer
                    </Typography>
                )}
            </Stack>
        );
    } else if (state.page === 'review') {
        return (
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center">
                    <Button onClick={goBack} variant="mono">
                        <ArrowBackIcon
                            sx={{
                                fontSize: '22px',
                            }}
                        ></ArrowBackIcon>
                    </Button>

                    <Typography variant="smallHeadline">
                        {'Confirm Transfer'}
                    </Typography>
                </Stack>

                <TransferComponent
                    transfer={transferObject}
                ></TransferComponent>

                <Typography>{`$${transferAmount} will be deducted from your ${sourceAccount.name} within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    onClick={() => {
                        onComplete(transferObject);

                        dispatch({
                            type: 'CHANGE_VIEW',
                            page: 'confirmed',
                        });
                    }}
                    disabled={loading}
                >
                    {loading ? <LoadingText></LoadingText> : 'Confirm Transfer'}
                </Button>
            </Stack>
        );
    } else if (state.page === 'confirmed') {
        return (
            <Stack spacing={2}>
                <Typography variant="smallHeadline">
                    Transfer Pending
                </Typography>

                <TransferComponent
                    transfer={transferObject}
                ></TransferComponent>

                <Typography>{`$${transferAmount} will be deducted from your ${sourceAccount.name} within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    sx={{
                        backgroundColor: 'legendaryGreen.main',
                    }}
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_VIEW',
                            page: 'setup',
                        });
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        'New transfer'
                    )}
                </Button>
            </Stack>
        );
    }

    return (
        <>
            <ErrorComponent></ErrorComponent>
        </>
    );
};

export default CreateTransferComponent;
