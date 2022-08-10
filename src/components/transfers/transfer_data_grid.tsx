import {DataGrid, GridColumns} from '@mui/x-data-grid';
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
import StyledDataGrid from 'components/data_grid/styled_data_grid';

const columns: GridColumns = [
    {
        field: 'sourceName',
        headerName: 'From',
        minWidth: 130,
        flex: 1,
        editable: false,
        headerClassName: 'first-column',
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
                    <div className="MuiDataGrid-cellContent">
                        <Chip
                            label={'Pending'}
                            color={'pencilYellow' as any}
                            sx={{color: 'blackDawn.main'}}
                        ></Chip>
                    </div>
                );
            } else if (params.value === 'PROCESSED') {
                return (
                    <div className="MuiDataGrid-cellContent">
                        <Chip
                            label={'Complete'}
                            color={'grassGreen' as any}
                            sx={{color: 'blackDawn.main'}}
                        ></Chip>
                    </div>
                );
            }
        },
    },
];

interface TransferDataGridProps {
    transfers: Array<any>;
    assetStates: Array<string>;
    onDownloadCsv(): Promise<any>;
    onChangeDateRange(): Promise<any>;
    onChangeAsset(): Promise<any>;
}

const TransferDataGrid = ({
    transfers,
    assetStates,
    onDownloadCsv,
    onChangeDateRange,
    onChangeAsset,
}: TransferDataGridProps) => {
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
                sx={{
                    ml: '55px',
                    mr: '70px',
                }}
            >
                <Typography variant={'smallHeadline' as any}>
                    Transactions
                </Typography>

                <Stack direction="row" justifyContent={'flex-end'}>
                    <FormControl
                        variant={'filled' as any}
                        fullWidth
                        color={'light' as any}
                        sx={{width: '180px'}}
                    >
                        <InputLabel>Asset</InputLabel>
                        <Select name="state" value={null} sx={{height: '55px'}}>
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
                        color={'light' as any}
                        sx={{width: '180px'}}
                    >
                        <InputLabel>Date Range</InputLabel>
                        <Select name="state" value={null} sx={{height: '55px'}}>
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
                        variant={'secondary' as any}
                        color={'light' as any}
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
            <StyledDataGrid columns={columns} rows={transfers}></StyledDataGrid>
        </Box>
    );
};

export default TransferDataGrid;
