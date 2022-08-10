import {DataGrid, GridColumns} from '@mui/x-data-grid';
import {Box} from '@mui/material';

interface DataGridProps {
    columns: GridColumns;
    rows: Array<any>;
    loading: boolean;
}

const StyledDataGrid = ({columns, rows, loading}: DataGridProps) => {
    columns[0].headerClassName = 'first-column';

    return (
        <Box sx={{width: '100%', height: '850px', mt: 2}}>
            <DataGrid
                loading={loading}
                rows={rows}
                columns={columns}
                autoPageSize
                headerHeight={38}
                sx={{
                    color: 'blackDawn.main',
                    '& .MuiDataGrid-columnHeaders': {
                        minHeight: '38px',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        border: 'none',
                    },
                    '& .first-column': {marginLeft: '100px'},

                    '& .MuiDataGrid-cellContent': {
                        marginLeft: '100px',
                    },
                }}
            />
        </Box>
    );
};

export default StyledDataGrid;
