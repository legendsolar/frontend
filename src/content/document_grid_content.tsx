import {GridColumns} from '@mui/x-data-grid';
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
import {useState} from 'react';
import DocumentDataGrid from 'components/documents/document_data_grid';
import {DataGridDateRange} from 'utils/date_range';

const columns: GridColumns = [
    {
        field: 'name',
        headerName: 'Document Name',
        minWidth: 130,
        flex: 1,
        editable: false,
    },
    {
        field: 'facility',
        headerName: 'Solar Farm',
        minWidth: 90,
        flex: 1,
        editable: false,
    },
    {
        field: 'type',
        headerName: 'Document Type',
        minWidth: 70,
        flex: 1,
        editable: false,
    },
    {
        field: 'created',
        headerName: 'Date',
        minWidth: 110,
        flex: 1,
        editable: false,
    },
    {
        field: 'download',
        headerName: '',
        minWidth: 140,
        flex: 1,
        editable: false,
        renderCell: (params) => {
            return (
                <div className="MuiDataGrid-cellContent">
                    <Chip
                        label={'Download'}
                        color={'whiteFog' as any}
                        sx={{color: 'blackDawn.main'}}
                    ></Chip>
                </div>
            );
        },
    },
];
interface DocumentDataGridProps {
    documents: Array<any>;
    assetStates: Array<string>;
    assetState: string;
    dateRange: DataGridDateRange;
    onDownloadDocument(): Promise<any>;
    onChangeDateRange(range: DataGridDateRange): Promise<any>;
    onChangeAsset(asset: string): Promise<any>;
}

const DocumentGridContent = ({
    documents,
    assetStates,
    assetState,
    dateRange,
    onDownloadDocument,
    onChangeDateRange,
    onChangeAsset,
}: DocumentDataGridProps) => {
    const [loading, setLoading] = useState(false);

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
                    Documents
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
                                    e.target.value as DataGridDateRange,
                                ).finally(() => {
                                    setLoading(false);
                                });
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
                </Stack>
            </Stack>
            <DocumentDataGrid
                documents={documents}
                loading={loading}
                sx={{
                    height: '100vh',
                    width: '100%',
                    mt: 2,
                }}
            ></DocumentDataGrid>
        </Box>
    );
};

export default DocumentGridContent;
