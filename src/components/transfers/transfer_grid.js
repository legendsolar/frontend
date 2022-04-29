import {Grid, Typography, Paper} from '@mui/material';
import TransferComponent from 'components/transfers/transfer_component';
import PropTypes from 'prop-types';

const TransferGrid = ({transfers}) => {
    console.log({
        gridTransfers: transfers,
    });

    return (
        <div>
            <Grid
                container
                sx={{mt: 1}}
                justifyContent="center"
                alignItems="center"
            >
                {transfers.map((transfer) => {
                    return (
                        <Grid item s={6} key={transfer.id}>
                            <TransferComponent
                                transfer={transfer}
                            ></TransferComponent>
                        </Grid>
                    );
                })}
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
};

export default TransferGrid;
