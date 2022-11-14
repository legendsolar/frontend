import Component from '../basics/component';
import {Typography, Box} from '@mui/material';
import {TransferGrid} from './transfer_grid';
import {loadingOrEmptyTransfers} from 'static/placeholder_transfers';
import {DisplayTransfer} from './transfer_transforms';

interface Props {
    transfers: Array<DisplayTransfer>;
    loading: boolean;
}

export const RecentTransfersComponent = ({transfers, loading}: Props) => {
    const emptyOrNull = !transfers || transfers?.length === 0;

    const emptyOrNullOrLoading = emptyOrNull || loading;

    const renderTransfers = emptyOrNullOrLoading
        ? loadingOrEmptyTransfers
        : transfers;

    return (
        <Component standardWidth={false}>
            <Typography variant={'smallHeadline' as any} sx={{opacity: 1}}>
                {emptyOrNull && !loading
                    ? 'No transfers yet'
                    : 'Recent Transfers'}
            </Typography>

            {emptyOrNullOrLoading ? (
                <Box
                    style={
                        loading
                            ? {
                                  animation: 'opacityAnimation 2s infinite',
                                  animationTimingFunction: 'ease-in-out',
                              }
                            : {
                                  opacity: 0.5,
                              }
                    }
                >
                    <TransferGrid
                        transfers={renderTransfers}
                        loading={false}
                    ></TransferGrid>
                </Box>
            ) : (
                <TransferGrid
                    transfers={renderTransfers}
                    loading={false}
                ></TransferGrid>
            )}
        </Component>
    );
};
