import {GridColumns} from '@mui/x-data-grid';
import {Chip} from '@mui/material';
import StyledDataGrid from 'components/data_grid/styled_data_grid';

const columns: GridColumns = [
    {
        field: 'sourceName',
        headerName: 'From',
        minWidth: 130,
        flex: 1,
        editable: false,
    },
    {
        field: 'destinationName',
        headerName: 'To',
        minWidth: 90,
        flex: 1,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        minWidth: 70,
        flex: 1,
        editable: false,
        valueFormatter: (params) => {
            return '$' + params.value;
        },
    },
    {
        field: 'date',
        headerName: 'Date',
        minWidth: 110,
        flex: 1,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 140,
        flex: 1,
        editable: false,
        renderCell: (params) => {
            if (params.value === 'PENDING') {
                return (
                    <div className="MuiDataGrid-cellContent">
                        <Chip
                            label={'Pending'}
                            color={'pencilYellow' as any}
                            sx={{color: 'blackDusk.main'}}
                        ></Chip>
                    </div>
                );
            } else if (params.value === 'PROCESSED') {
                return (
                    <div className="MuiDataGrid-cellContent">
                        <Chip
                            label={'Complete'}
                            color={'grassGreen' as any}
                            sx={{color: 'blackDusk.main'}}
                        ></Chip>
                    </div>
                );
            }
        },
    },
];
interface TransferDataGridProps {
    transfers: Array<any>;
    loading: boolean;
    sx?: any;
}

const TransferDataGrid = ({
    transfers,
    loading,
    sx = {},
}: TransferDataGridProps) => {
    return (
        <StyledDataGrid
            columns={columns}
            rows={transfers}
            loading={loading}
            sx={sx}
        ></StyledDataGrid>
    );
};

export default TransferDataGrid;
