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
export enum TransferDateRange {
    WEEK_TO_DATE = 'Week to Date',
    MONTH_TO_DATE = 'Month to date',
    QUARTER_TO_DATE = 'Quarter to date',
    LAST_SIX_MONTHS = 'Last six months',
    YEAR_TO_DATE = 'Year to date',
    NONE = 'None',
}
interface TransferDataGridProps {
    transfers: Array<any>;
    assetStates: Array<string>;
    assetState: string;
    dateRange: TransferDateRange;
    onDownloadCsv(): Promise<any>;
    onChangeDateRange(range: TransferDateRange): Promise<any>;
    onChangeAsset(asset: string): Promise<any>;
}

const TransferDataGrid = ({
    transfers,
    assetStates,
    assetState,
    dateRange,
    onDownloadCsv,
    onChangeDateRange,
    onChangeAsset,
}: TransferDataGridProps) => {
    const [loading, setLoading] = useState(false);

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
                        <Select
                            name="state"
                            value={assetState}
                            sx={{height: '55px'}}
                            onChange={(e) => {
                                setLoading(true);
                                onChangeAsset(e.target.value).finally(() => {
                                    setLoading(false);
                                });
                            }}
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
                        color={'light' as any}
                        sx={{width: '180px'}}
                    >
                        <InputLabel>Date Range</InputLabel>
                        <Select
                            name="state"
                            value={dateRange}
                            sx={{height: '55px'}}
                            onChange={(e) => {
                                setLoading(true);
                                onChangeDateRange(
                                    e.target.value as TransferDateRange,
                                ).finally(() => {
                                    setLoading(false);
                                });
                            }}
                        >
                            {Object.entries(TransferDateRange).map(
                                ([key, value]) => {
                                    return (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    );
                                },
                            )}
                        </Select>
                    </FormControl>

                    <Button
                        variant={'secondary' as any}
                        color={'light' as any}
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            onDownloadCsv().finally(() => {
                                setLoading(false);
                            });
                        }}
                    >
                        {loading ? 'Loading...' : 'Download CSV'}
                    </Button>
                </Stack>
            </Stack>
            <StyledDataGrid
                columns={columns}
                rows={transfers}
                loading={loading}
            ></StyledDataGrid>
        </Box>
    );
};

export default TransferDataGrid;
