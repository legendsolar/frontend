import {Typography, Grid} from '@mui/material';
import TransferGrid from 'components/transfers/transfer_grid';
import DefaultComponent from 'components/utils/default_component';

const TransferPlaceholder = () => {
    return (
        <div>
            <DefaultComponent>
                <Typography variant="smallHeadline">
                    You have not received any dividends.
                </Typography>
                <Typography variant="headline1">
                    Purchase panels to earn more dividends.
                </Typography>
            </DefaultComponent>
        </div>
    );
};

export default TransferPlaceholder;
