import {DataGrid, GridColumns} from '@mui/x-data-grid';
import {Box} from '@mui/material';

interface DataGridProps {
    columns: GridColumns;
    rows: Array<any>;
    loading: boolean;
    sx: any;
}

const StyledDataGrid = ({columns, rows, loading, sx}: DataGridProps) => {
    columns[0].headerClassName = 'first-column';

    return (
        <Box sx={{...sx, marginLeft: '-20px', marginRight: '-20px'}}>
            <DataGrid
                loading={loading}
                rows={rows}
                columns={columns}
                autoPageSize
                headerHeight={38}
                disableSelectionOnClick
                sx={{}}
            />
        </Box>
    );
};

export default StyledDataGrid;
