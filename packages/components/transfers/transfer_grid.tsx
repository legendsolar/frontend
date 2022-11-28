import { Grid, Typography, Paper, CircularProgress } from "@mui/material";
import { TransferComponent } from "../transfers/transfer_component";
import { DisplayTransfer } from "@project/hooks/transformers/transfer_transforms";

export const TransferGrid = ({
  transfers,
  loading,
  constrained = false,
}: {
  transfers: Array<DisplayTransfer>;
  loading: boolean;
  constrained: boolean;
}) => {
  const emptyTransfers = !transfers || transfers.length === 0;

  return (
    <div>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        {loading && (
          <Grid item xs={12}>
            <CircularProgress></CircularProgress>
          </Grid>
        )}

        {!emptyTransfers
          ? transfers.map((transfer, i) => {
              return (
                <Grid item xs={12} lg={constrained ? 12 : 6} key={i}>
                  <TransferComponent transfer={transfer}></TransferComponent>
                </Grid>
              );
            })
          : !loading && <Typography>No transfers</Typography>}
      </Grid>
    </div>
  );
};
