import {GridColumns} from '@mui/x-data-grid';
import {Chip} from '@mui/material';
import {StyledDataGrid} from '../data_grid/styled_data_grid';
import {paletteOptions} from '../theme';

var tinycolor = require('tinycolor2');
interface TransferDataGridProps {
    transfers: Array<any>;
    autoHeight?: boolean;
    loading: boolean;
    viewPortOverrideWidthPx?: number;
    sx?: any;
}

export const TransferDataGrid = ({
    transfers,
    loading,
    viewPortOverrideWidthPx = undefined,
    autoHeight = false,
    sx = {},
}: TransferDataGridProps) => {
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
                                    backgroundColor: tinycolor(
                                        paletteOptions.palette.pencilYellow
                                            .main,
                                    )
                                        .setAlpha(0.5)
                                        .toRgbString(),
                                    color: 'blackDusk.main',
                                    width: '100px',
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
                                    backgroundColor: tinycolor(
                                        paletteOptions.palette.grassGreen.main,
                                    )
                                        .setAlpha(0.5)
                                        .toRgbString(),
                                    color: 'blackDusk.main',
                                    width: '100px',
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
                    sort: 'desc',
                },
            ]}
            sx={{
                height: '500px',
                ...sx,
            }}
        ></StyledDataGrid>
    );
};
