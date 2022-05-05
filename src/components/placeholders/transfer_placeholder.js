import {Typography, Grid} from '@mui/material';
import TransferGrid from 'components/transfers/transfer_grid';
import DefaultComponent from 'components/utils/default_component';

const TransferPlaceholder = () => {
    return (
        <div>
            <Grid container spacing={4} sx={{width: '100%'}}>
                <Grid item xs={12}>
                    <DefaultComponent>
                        <Typography variant="smallHeadline">
                            You have not received any dividends.
                        </Typography>
                        <Typography variant="headline1">
                            Purchase panels to earn more dividends.
                        </Typography>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="smallHeadline">
                        Dividend Earnings
                    </Typography>
                    <DefaultComponent>
                        <TransferGrid></TransferGrid>
                    </DefaultComponent>
                </Grid>
            </Grid>
        </div>
    );
};

export default TransferPlaceholder;
