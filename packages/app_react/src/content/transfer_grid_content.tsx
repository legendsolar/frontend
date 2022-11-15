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
import {TransferDataGrid} from '@project/components/transfers/transfer_data_grid';
import {DataGridDateRange} from '@p/utils/date_range';
import {LoadingText} from '@project/components/utils/loading_text';
import {MainContentBox} from '@project/components/basics';
import {useChartDimensions} from '@project/hooks/use_chart_dimensions';
interface TransferGridContentProps {
    loading: boolean;
    transfers: Array<any> | undefined;
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
    const {ref, dms} = useChartDimensions({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    });

    return (
        <Box sx={{mt: {lg: '30px', md: '45px', sm: '50px'}}}>
            <MainContentBox passedRef={ref}>
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
            </MainContentBox>
            <TransferDataGrid
                transfers={transfers ? transfers : []}
                loading={loading}
                viewPortOverrideWidthPx={dms.width}
                sx={{
                    height: '80vh',
                    width: '100%',
                    mt: '10px',
                }}
            ></TransferDataGrid>
        </Box>
    );
};

export default TransferGridContent;
