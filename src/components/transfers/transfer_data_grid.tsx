import {GridColumns} from '@mui/x-data-grid';
import {Chip} from '@mui/material';
import StyledDataGrid from 'components/data_grid/styled_data_grid';

interface TransferDataGridProps {
    transfers: Array<any>;
    autoHeight?: boolean;
    loading: boolean;
    viewPortOverrideWidthPx?: number;
    sx?: any;
}

const TransferDataGrid = ({
    transfers,
    loading,
    viewPortOverrideWidthPx = undefined,
    autoHeight = false,
    sx = {},
}: TransferDataGridProps) => {
    // lassor owes me

    const columns: GridColumns = [
        {
            field: 'sourceName',
            headerName: 'From',
            flex: 1,
            editable: false,
        },
        {
            field: 'destinationName',
            headerName: 'To',
            flex: 1,
            editable: false,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
            editable: false,
            valueFormatter: (params) => {
                return '$' + params.value;
            },
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            editable: false,
            renderCell: (params) => {
                if (params.value === 'PENDING') {
                    return (
                        <div className="MuiDataGrid-cellContent">
                            <Chip
                                label={'Pending'}
                                sx={{
                                    backgroundColor: 'pencilYellow.light',
                                    color: 'blackDusk.main',
                                }}
                            ></Chip>
                        </div>
                    );
                } else if (params.value === 'PROCESSED') {
                    return (
                        <div className="MuiDataGrid-cellContent">
                            <Chip
                                label={'Complete'}
                                sx={{
                                    backgroundColor: 'grassGreen.light',
                                    color: 'blackDusk.main',
                                }}
                            ></Chip>
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <StyledDataGrid
            columns={columns}
            rows={transfers}
            loading={loading}
            viewPortOverrideWidthPx={viewPortOverrideWidthPx}
            autoHeight={autoHeight}
            defaultSortModel={[
                {
                    field: 'date',
                    sort: 'asc',
                },
            ]}
            sx={sx}
        ></StyledDataGrid>
    );
};

export default TransferDataGrid;
