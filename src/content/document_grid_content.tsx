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

interface DocumentDataGridProps {
    loading: boolean;
    documents: Array<any>;
    assetStates: Array<string>;
    assetState: string;
    dateRange: DataGridDateRange;
    onDownloadDocument(): Promise<any>;
    onChangeDateRange(range: DataGridDateRange): Promise<any>;
    onChangeAsset(asset: string): Promise<any>;
}

const DocumentGridContent = ({
    loading,
    documents,
    assetStates,
    assetState,
    dateRange,
    onDownloadDocument,
    onChangeDateRange,
    onChangeAsset,
}: DocumentDataGridProps) => {
    return (
        <Box sx={{mt: '30px'}}>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{mb: '37px'}}
            >
                <Typography variant={'smallHeadline' as any}>
                    Documents
                </Typography>
            </Stack>
            <DocumentDataGrid
                documents={documents}
                loading={loading}
                sx={{
                    height: '80vh',
                    width: '100%',
                    mt: 2,
                }}
            ></DocumentDataGrid>
        </Box>
    );
};

export default DocumentGridContent;
