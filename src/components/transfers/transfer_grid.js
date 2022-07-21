import {Grid, Typography, Paper, CircularProgress} from '@mui/material';
import TransferComponent from 'components/transfers/transfer_component';
import PropTypes from 'prop-types';

const TransferGrid = ({transfers, loading}) => {
    const emptyTransfers = !transfers || transfers.length === 0;

    return (
        <div>
            <Grid
                container
                sx={{mt: 1}}
                justifyContent="center"
                alignItems="center"
            >
                {loading && (
                    <Grid item s={12}>
                        <CircularProgress></CircularProgress>
                    </Grid>
                )}

                {!emptyTransfers
                    ? transfers.map((transfer) => {
                          return (
                              <Grid item s={6} key={transfer.id}>
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

TransferGrid.propTypes = {
    transfers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            amount: PropTypes.shape({
                value: PropTypes.string.isRequired,
                currency: PropTypes.string.isRequired,
            }),
            // source: PropTypes.string.isRequired,
            // destination: PropTypes.string.isRequired,
            created: PropTypes.string.isRequired,
        }),
    ),
    loading: PropTypes.bool,
};

export default TransferGrid;
