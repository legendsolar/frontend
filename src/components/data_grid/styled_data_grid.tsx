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
                sx={{
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: 'none',
                    },
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

                    '& .MuiDataGrid-root': {
                        paddingLeft: '-100px',
                        paddingRight: '-100px',
                    },
                }}
            />
        </Box>
    );
};

export default StyledDataGrid;
