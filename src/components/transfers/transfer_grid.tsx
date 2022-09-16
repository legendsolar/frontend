import {Grid, Typography, Paper, CircularProgress} from '@mui/material';
import TransferComponent from 'components/transfers/transfer_component';
import {DisplayTransfer} from './transfer_transforms';

const TransferGrid = ({
    transfers,
    loading,
}: {
    transfers: Array<DisplayTransfer>;
    loading: boolean;
}) => {
    const emptyTransfers = !transfers || transfers.length === 0;

    return (
        <div>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={2}
                justifyContent="center"
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
                              <Grid item xs={12} lg={6} key={i}>
                                  <TransferComponent
                                      transfer={transfer}
                                  ></TransferComponent>
                              </Grid>
                          );
                      })
                    : !loading && <Typography>No transfers</Typography>}
            </Grid>
        </div>
    );
};

export default TransferGrid;
