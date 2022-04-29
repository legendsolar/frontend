import {DataGrid} from '@mui/x-data-grid';
import {Button, Box, Stack, Typography} from '@mui/material';

import {selectTransactions, fetchTransactions} from 'slices/transfer_slice';
import {useSelector, useDispatch} from 'react-redux';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import {useEffect} from 'react';
import {format} from 'date-fns';

const columns = [
    {
        field: 'created',
        headerName: 'Date',
        width: 150,
        editable: false,
        valueFormatter: (params) => {
            const dateInt = parseInt(params.value);
            const formatted = format(new Date(dateInt), 'P');
            return formatted;
        },
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 110,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 140,
        editable: false,
    },
    {
        field: 'sourceName',
        headerName: 'From',
        width: 200,
        editable: false,
    },
    {
        field: 'destinationName',
        headerName: 'To',
        width: 200,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 110,
        editable: false,
    },
];

const rows = [
    {
        id: 0,
        date: 'June 10, 2022',
        type: 'Dividend',
        status: 'Pending',
        from: 'Legends SPV',
        to: 'Legends Wallet',
        amount: '$145.76',
    },
    {
        id: 1,
        date: 'May 10, 2022',
        type: 'Dividend',
        status: 'Complete',
        from: 'Legends SPV',
        to: 'Legends Wallet',
        amount: '$195.76',
    },
    {
        id: 2,
        date: 'April 10, 2022',
        type: 'Dividend',
        status: 'Complete',
        from: 'Legends SPV',
        to: 'Legends Wallet',
        amount: '$125.76',
    },
    {
        id: 3,
        date: 'March 10, 2022',
        type: 'Dividend',
        status: 'Complete',
        from: 'Legends SPV',
        to: 'Legends Wallet',
        amount: '$165.76',
    },
    {
        id: 4,
        date: 'March 5, 2022',
        type: 'Investment',
        status: 'Complete',
        from: 'Bank of America',
        to: 'Legends SPV',
        amount: '$25,000',
    },
];

const TransferDataGrid = ({transfers}) => {
    function download(filename, textInput) {
        var element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput),
        );
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();
        //document.body.removeChild(element);
    }

    const onDownloadCsv = () => {
        cloudFunctions.generateTransferSummary().then(({data}) => {
            console.log(data);
            const csv = data.csv;
            console.log(csv);

            var filename = 'output.csv';
            download(filename, csv);
        });
    };

    return (
        <Box>
            <Stack direction="row" justifyContent={'space-between'}>
                <Typography variant="smallHeadline">
                    All Transactions
                </Typography>

                <Button variant="mini" onClick={onDownloadCsv}>
                    Download CSV
                </Button>
            </Stack>

            <Box sx={{width: '100%', height: '850px', mt: 2}}>
                <DataGrid
                    rows={transfers}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Box>
    );
};

export default TransferDataGrid;
