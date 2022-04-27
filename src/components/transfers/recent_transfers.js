import {Grid, Typography, Paper} from '@mui/material';
import TransactionComponent from 'components/transfers/transfer_component';
import PropTypes from 'prop-types';

import {selectTransactions, fetchTransactions} from 'slices/transfer_slice';
import {useSelector, useDispatch} from 'react-redux';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import {useEffect} from 'react';
import TransactionGrid from 'components/transfers/transfer_grid';

const RecentTransfers = (transferType) => {
    const dispatch = useDispatch();
    const cloudFunctions = useCloudFunctions();

    const transactionStatus = useSelector((state) => state.transactions.status);
    const transactions = useSelector(selectTransactions);

    useEffect(() => {
        if (transactionStatus === 'idle') {
            console.log(
                'dispatch fetch transactions: line 24, recent transfers',
            );
            dispatch(fetchTransactions(cloudFunctions));
        }
    }, [transactionStatus, dispatch]);

    if (transactionStatus === 'loading') {
        return <Typography>loading</Typography>;
    } else if (transactionStatus === 'succeeded' && transactions.length > 0) {
        return (
            <TransactionGrid
                title={'Recent Transactions'}
                transactions={transactions}
            ></TransactionGrid>
        );
    } else if (transactionStatus === 'succeeded' && transactions.length == 0) {
        return <Typography>No transactions found </Typography>;
    } else {
        return <Typography>error</Typography>;
    }
};

export default RecentTransfers;
