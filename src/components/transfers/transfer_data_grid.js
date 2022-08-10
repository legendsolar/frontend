import {DataGrid} from '@mui/x-data-grid';
import {
    Button,
    Box,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';
import {format} from 'date-fns';
import {useState} from 'react';
import {transferTransformer} from 'hooks/use_transfer';

const columns = [
    {
        field: 'sourceName',
        headerName: 'From',
        minWidth: 130,
        flex: 1,
        editable: false,
    },
    {
        field: 'destinationName',
        headerName: 'To',
        minWidth: 90,
        flex: 1,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        minWidth: 70,
        flex: 1,
        editable: false,
        valueFormatter: (params) => {
            return '$' + params.value;
        },
    },
    {
        field: 'date',
        headerName: 'Date',
        minWidth: 110,
        flex: 1,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 140,
        flex: 1,
        editable: false,
        renderCell: (params) => {
            if (params.value === 'PENDING') {
                return (
                    <Chip
                        label={'Pending'}
                        color={'pencilYellow'}
                        sx={{color: 'blackDawn.main'}}
                    ></Chip>
                );
            } else if (params.value === 'PROCESSED') {
                return (
                    <Chip
                        label={'Complete'}
                        color={'grassGreen'}
                        sx={{color: 'blackDawn.main'}}
                    ></Chip>
                );
            }
        },
    },
];

const TransferDataGrid = ({
    transfers,
    assetStates,
    onDownloadCsv,
    onChangeDateRange,
    onChangeAsset,
}) => {
    const [downloadLinkLoading, setDownloadLinkLoading] = useState(false);

    const dateRangeStates = [
        'Week to date',
        'Month to date',
        'Quarter to date',
        'Last six month',
        'Year to date',
    ];

    return (
        <Box sx={{mt: '100px'}}>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant="smallHeadline">Transactions</Typography>

                <Stack direction="row" justifyContent={'flex-end'}>
                    <FormControl
                        variant="filled"
                        fullWidth
                        color={'light'}
                        sx={{width: '180px'}}
                    >
                        <InputLabel>Asset</InputLabel>
                        <Select
                            helperText={'state'}
                            name="state"
                            value={null}
                            sx={{height: '55px'}}
                        >
                            {assetStates.map((asset) => {
                                return (
                                    <MenuItem key={asset} value={asset}>
                                        {asset}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="filled"
                        fullWidth
                        color={'light'}
                        sx={{width: '180px'}}
                    >
                        <InputLabel>Date Range</InputLabel>
                        <Select
                            helperText={'state'}
                            name="state"
                            value={null}
                            sx={{height: '55px'}}
                        >
                            {dateRangeStates.map((range) => {
                                return (
                                    <MenuItem key={range} value={range}>
                                        {range}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <Button
                        variant="secondary"
                        color={'light'}
                        disabled={downloadLinkLoading}
                        onClick={() => {
                            setDownloadLinkLoading(true);
                            onDownloadCsv().finally(() => {
                                setDownloadLinkLoading(false);
                            });
                        }}
                    >
                        {downloadLinkLoading ? 'Loading...' : 'Download CSV'}
                    </Button>
                </Stack>
            </Stack>

            <Box sx={{width: '100%', height: '850px', mt: 2}}>
                <DataGrid
                    rows={transfers}
                    columns={columns}
                    autoPageSize
                    headerHeight={38}
                    sx={{
                        color: 'blackDawn.main',
                        '& .MuiDataGrid-columnHeaders': {
                            minHeight: '38px',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            border: 'none',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default TransferDataGrid;
