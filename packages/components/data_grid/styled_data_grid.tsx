import { DataGrid, GridColumns, GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
import { fromViewportPadding } from "../basics";
import { defined } from "@p/utils/object_utils";

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
}: StyledDataGridProps) => {
  const [sortModel, setSortModel] = useState<GridSortModel | undefined>(
    defaultSortModel
      ? defaultSortModel
      : ({
          field: columns[0].field,
          sort: "asc",
        } as any as GridSortModel)
  );

  columns[0].headerClassName = "first-column";

  console.log(viewPortOverrideWidthPx);

  if (defined(viewPortOverrideWidthPx)) {
    // attempt to match mui's cacl: https://mui.com/x/react-data-grid/column-dimensions/
    var remainingWidth = viewPortOverrideWidthPx + 1;

    const totalFlex = columns.reduce(
      (total, column) => total + (column?.flex || 0),
      0
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
      "& .MuiDataGrid-row": {
        paddingLeft: fromViewportPadding(),
        paddingRight: fromViewportPadding(),
      },

      "& .MuiDataGrid-columnHeadersInner": {
        paddingLeft: fromViewportPadding(),
        paddingRight: fromViewportPadding(),
      },
      ...sx,
    };
  }

  console.log(columns);

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
      showColumnRightBorder={false}
      onSortModelChange={(model) => setSortModel(model as GridSortModel)}
      autoHeight={autoHeight}
      sx={{
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "none",
        },

        ...sx,
      }}
    />
  );
};
