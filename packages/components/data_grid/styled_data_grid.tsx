import {DataGrid, GridColumns, GridSortModel} from '@mui/x-data-grid';
import {Box} from '@mui/material';
import {useState} from 'react';
import {fromViewportPadding} from '../utils/main_content_box';

export interface StyledDataGridProps {
    columns: GridColumns;
    rows: Array<any>;
    loading: boolean;
    defaultSortModel?: GridSortModel;
    viewPortOverrideWidthPx?: number;
    autoHeight?: boolean;
    sx?: any;
}

export const StyledDataGrid = ({
    columns,
    rows,
    loading,
    defaultSortModel = undefined,
    viewPortOverrideWidthPx = undefined,
    autoHeight = false,
    sx = {},
}: DataGridProps) => {
    const [sortModel, setSortModel] = useState<GridSortModel | undefined>(
        defaultSortModel
            ? defaultSortModel
            : ({
                  field: columns[0].field,
                  sort: 'asc',
              } as any as GridSortModel),
    );

    columns[0].headerClassName = 'first-column';

    if (viewPortOverrideWidthPx) {
        // attempt to match mui's cacl: https://mui.com/x/react-data-grid/column-dimensions/
        var remainingWidth = viewPortOverrideWidthPx;

        const totalFlex = columns.reduce(
            (total, column) => total + (column?.flex || 0),
            0,
        );

        columns.map((column) => {
            if (column?.width) {
                remainingWidth -= column.width;
                return column;
            }

            if (!column?.flex) {
                return column;
            }

            const flex = column.flex;
            delete column.flex;

            column.width = (remainingWidth * flex) / totalFlex;
        });

        sx = {
            '& .MuiDataGrid-row': {
                paddingLeft: fromViewportPadding(),
                paddingRight: fromViewportPadding(),
            },

            '& .MuiDataGrid-columnHeadersInner': {
                paddingLeft: fromViewportPadding(),
                paddingRight: fromViewportPadding(),
            },
            ...sx,
        };
    }

    return (
        <DataGrid
            loading={loading}
            rows={rows}
            columns={columns}
            autoPageSize
            headerHeight={38}
            rowHeight={118}
            disableExtendRowFullWidth
            disableSelectionOnClick
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model as GridSortModel)}
            autoHeight={autoHeight}
            sx={{
                // height: '80vh',

                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'none',
                },

                ...sx,
            }}
        />
    );
};
