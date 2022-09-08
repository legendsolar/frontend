import {Grid, Typography, Paper, CircularProgress} from '@mui/material';
import TransferComponent from 'components/transfers/transfer_component';
import {Transfer} from 'schema/schema_gen_types';

const TransferGrid = ({
    transfers,
    loading,
}: {
    transfers: Array<Transfer>;
    loading: boolean;
}) => {
    const emptyTransfers = !transfers || transfers.length === 0;

    return (
        <div>
            <Grid
                container
                rowSpacing={4}
                justifyContent="center"
                alignItems="center"
            >
                {loading && (
                    <Grid item xs={12}>
                        <CircularProgress></CircularProgress>
                    </Grid>
                )}

                {!emptyTransfers
                    ? transfers.map((transfer) => {
                          return (
                              <Grid item xs={6} key={transfer.id}>
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
