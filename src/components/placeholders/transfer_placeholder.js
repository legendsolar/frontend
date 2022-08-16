import {Typography, Grid} from '@mui/material';
import TransferGrid from 'components/transfers/transfer_grid';
import Component from 'components/basics/component';

const TransferPlaceholder = () => {
    return (
        <div>
            <Component>
                <Typography variant="smallHeadline">
                    You have not received any dividends.
                </Typography>
                <Typography variant="headline1">
                    Purchase panels to earn more dividends.
                </Typography>
            </Component>
        </div>
    );
};

export default TransferPlaceholder;
