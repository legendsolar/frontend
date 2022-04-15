import {
    Stack,
    Button,
    Typography,
    TextField,
    InputAdornment,
    CircularProgress,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useState, useReducer, useEffect} from 'react';
import ErrorComponent from 'components/errors/error_component';

import {validateTransferAmount} from 'validation/transaction_validation';
import TransferComponent from 'components/transfers/transfer_component';
import LoadingComponent from 'components/utils/loading_component';
import MultiSelect from 'components/utils/multiselect';

const CreateTransferComponent = ({accounts, loading, onComplete}) => {
    const initialState = {
        page: 'setup',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_VIEW':
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
    const [sourceAccount, setSourceAccount] = useState(null);
    const [destinationAccount, setDestinationAccount] = useState(null);
    const [transferAmount, setTransferAmount] = useState(undefined);

    const goBack = () => {
        dispatch({
            type: 'CHANGE_VIEW',
            page: 'setup',
        });
    };

    const displayAccounts = accounts.map((account) => {
        return {...account, text: account.name, value: account.id};
    });

    const onAccountSelected = (event) => {
        const {name, value} = event.target;

        console.log(event);
        console.log(name, value);

        const account = displayAccounts.filter(
            (account) => account.id === value,
        )[0];

        console.log(account);
        if (name === 'sourceAccount') {
            setSourceAccount(account);
        } else if (name === 'destinationAccount') {
            setDestinationAccount(account);
        }
    };

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    if (state.page === 'setup') {
        return (
            <Stack spacing={2}>
                <Typography variant="smallHeadline">Transfer Cash</Typography>

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
                ></TextField>

                <MultiSelect
                    name={'sourceAccount'}
                    text="From"
                    selected={sourceAccount}
                    fields={displayAccounts}
                    onChangeListener={onAccountSelected}
                ></MultiSelect>

                <MultiSelect
                    name={'destinationAccount'}
                    text="To"
                    selected={destinationAccount}
                    fields={displayAccounts}
                    onChangeListener={onAccountSelected}
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
                    title={'May 25th, 2022'}
                    amount={transferAmount}
                    source={sourceAccount?.name}
                    destination={destinationAccount?.name}
                    status={'In Review'}
                    color={'legendaryGreen'}
                ></TransferComponent>

                <Typography>{`$${transferAmount} will be deducted from your Legends Wallet within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    onClick={onComplete}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        'Confirm Transfer'
                    )}
                </Button>
            </Stack>
        );
    } else if (state.page === 'confirmed') {
        return (
            <Stack spacing={2}>
                <Typography variant="smallHeadline">
                    Transfer Pending
                </Typography>

                <TransactionComponent
                    title={'May 25th, 2022'}
                    amount={transferAmount}
                    source={sourceAccount?.name}
                    destination={destinationAccount?.name}
                    color={'pencilYellow'}
                    status={'Pending'}
                ></TransactionComponent>

                <Typography>{`$${transferAmount} will be deducted from your Legends Wallet within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    sx={{
                        backgroundColor: 'pencilYellow.main',
                    }}
                    onClick={onComplete}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        'Transfer Pending'
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
