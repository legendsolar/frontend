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
    onDownloadCsv,
}: TransferGridContentProps) => {
    return (
        <Box sx={{mt: '30px'}}>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant={'smallHeadline' as any}>
                    Transactions
                </Typography>

                <Stack direction="row" justifyContent={'flex-end'}>
                    <Button
                        variant={'secondary' as any}
                        color={'light' as any}
                        disabled={loading}
                        onClick={() => {
                            onDownloadCsv();
                        }}
                    >
                        {loading ? <LoadingText></LoadingText> : 'Download'}
                    </Button>
                </Stack>
            </Stack>
            <TransferDataGrid
                transfers={transfers}
                loading={loading}
                sx={{
                    height: '80vh',
                    width: '100%',
                    mt: '12px',
                }}
            ></TransferDataGrid>
        </Box>
    );
};

export default TransferGridContent;
