import {GridColumns} from '@mui/x-data-grid';
import {Chip} from '@mui/material';

import StyledDataGrid from 'components/data_grid/styled_data_grid';
import {format} from 'date-fns';

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
        valueFormatter: (params) => {
            return format(params.value as Date, 'PP');
        },
    },
    {
        field: 'downloadLink',
        headerName: '',
        minWidth: 140,
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
                    ></Chip>
                </div>
            );
        },
    },
];
interface DocumentDataGridProps {
    documents: Array<any>;
    loading: boolean;
    sx?: any;
}

const DocumentDataGrid = ({
    documents,
    loading,
    sx = {},
}: DocumentDataGridProps) => {
    return (
        <StyledDataGrid
            columns={columns}
            rows={documents}
            loading={loading}
            sx={sx}
        ></StyledDataGrid>
    );
};

export default DocumentDataGrid;
