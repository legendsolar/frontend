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

import {useChartDimensions} from 'hooks/use_chart_dimensions';
import MainContentBox from 'utils/main_content_box';
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
    const [ref, dms] = useChartDimensions({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    });
    return (
        <Box sx={{mt: '30px'}}>
            <MainContentBox passedRef={ref}>
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
            </MainContentBox>
            <DocumentDataGrid
                documents={documents}
                loading={loading}
                viewPortOverrideWidthPx={dms.width}
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
