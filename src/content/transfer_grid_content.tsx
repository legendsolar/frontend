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
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import {DataGridDateRange} from 'utils/date_range';
import LoadingText from 'components/utils/loading_text';

interface TransferGridContentProps {
    loading: boolean;
    transfers: Array<any>;
    assetStates: Array<string>;
    assetState: string;
    dateRange: DataGridDateRange;
    onDownloadCsv(): Promise<any>;
    onChangeDateRange(range: DataGridDateRange): Promise<any>;
    onChangeAsset(asset: string): Promise<any>;
}

const TransferGridContent = ({
    loading,
    transfers,
    assetStates,
    assetState,
    dateRange,
    onDownloadCsv,
    onChangeDateRange,
    onChangeAsset,
}: TransferGridContentProps) => {
    return (
        <Box sx={{mt: '30px'}}>
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
                                onChangeAsset(e.target.value);
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
                                onChangeDateRange(
                                    e.target.value as DataGridDateRange,
                                );
                            }}
                        >
                            {Object.entries(DataGridDateRange).map(
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
                            onDownloadCsv();
                        }}
                    >
                        {loading ? <LoadingText></LoadingText> : 'Download CSV'}
                    </Button>
                </Stack>
            </Stack>
            <TransferDataGrid
                transfers={transfers}
                loading={loading}
                sx={{
                    height: '100vh',
                    width: '100%',
                    mt: 2,
                }}
            ></TransferDataGrid>
        </Box>
    );
};

export default TransferGridContent;
