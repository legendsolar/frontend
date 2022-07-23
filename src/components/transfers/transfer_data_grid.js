import {DataGrid} from '@mui/x-data-grid';
import {Button, Box, Stack, Typography} from '@mui/material';
import {format} from 'date-fns';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import {useState} from 'react';

const columns = [
    {
        field: 'created',
        headerName: 'Date',
        width: 150,
        editable: false,
        valueFormatter: (params) => {
            return format(new Date(params.value), 'P');
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

const TransferDataGrid = ({transfers}) => {
    const {downloadAllTransfers} = useCloudFunctions();
    const [downloadLinkLoading, setDownloadLinkLoading] = useState(false);

    const onDownloadCsv = () => {
        setDownloadLinkLoading(true);
        downloadAllTransfers()
            .then(({data}) => {
                console.log(data.downloadLink);
                window.open(data.downloadLink);
            })
            .finally(() => {
                setDownloadLinkLoading(false);
            });
    };

    return (
        <Box>
            <Stack direction="row" justifyContent={'space-between'}>
                <Typography variant="smallHeadline">
                    All Transactions
                </Typography>

                <Button
                    variant="mini"
                    disabled={downloadLinkLoading}
                    onClick={onDownloadCsv}
                >
                    {downloadLinkLoading ? 'Loading...' : 'Download CSV'}
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
