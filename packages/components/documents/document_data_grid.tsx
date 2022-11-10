import {GridColumns} from '@mui/x-data-grid';
import {Chip} from '@mui/material';

import StyledDataGrid from '../data_grid/styled_data_grid';
import {format} from 'date-fns';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface DocumentDataGridProps {
    documents: Array<any>;
    loading: boolean;
    viewPortOverrideWidthPx?: number;
    sx?: any;
}

const DocumentDataGrid = ({
    documents,
    loading,
    viewPortOverrideWidthPx = undefined,
    sx = {},
}: DocumentDataGridProps) => {
    const columns: GridColumns = [
        {
            field: 'name',
            headerName: 'Document Name',
            flex: 1,
            editable: false,
        },
        {
            field: 'facility',
            headerName: 'Solar Farm',
            flex: 1,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'Document Type',
            flex: 1,
            editable: false,
        },
        {
            field: 'created',
            headerName: 'Date',
            flex: 1,
            editable: false,
            valueFormatter: (params) => {
                return format(params.value as Date, 'PP');
            },
        },
        {
            field: 'downloadLink',
            headerName: '',
            flex: 1,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className="MuiDataGrid-cellContent">
                        <Chip
                            component={'a'}
                            href={params.value}
                            target={'_blank'}
                            label={'Download'}
                            color={'whiteFog' as any}
                            sx={{color: 'blackDawn.main'}}
                            onDelete={() => {}}
                            deleteIcon={<ArrowDownwardIcon />}
                        ></Chip>
                    </div>
                );
            },
        },
    ];
    return (
        <StyledDataGrid
            columns={columns}
            rows={documents}
            viewPortOverrideWidthPx={viewPortOverrideWidthPx}
            loading={loading}
            defaultSortModel={[
                {
                    field: 'created',
                    sort: 'desc',
                },
            ]}
            sx={sx}
        ></StyledDataGrid>
    );
};

export default DocumentDataGrid;
