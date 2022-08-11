import {Typography, Stack} from '@mui/material';
import BasicMap from 'components/map/basic_map_component';
import TransferDataGrid from 'components/transfers/transfer_data_grid';
import DefaultComponent from 'components/utils/default_component';
import RooftopContent from 'content/rooftop_content';
import {testTransfers} from 'static_data/placeholder_transfers';

interface PortfolioContentProps {
    title: string;
    subtitle: string;
}

const PortfolioContent = ({title, subtitle}: PortfolioContentProps) => {
    return (
        <div>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'end'}
                sx={{mb: 3}}
            >
                <Typography variant={'headline2' as any}>{title}</Typography>
                <Typography variant={'monoButton' as any}>
                    {subtitle}
                </Typography>
            </Stack>
            <DefaultComponent
                paper
                standardWidth={false}
                sx={{height: '400px', m: 0, p: 0}}
            >
                <BasicMap></BasicMap>
            </DefaultComponent>

            <Stack>
                <Typography>All time return</Typography>

                <Stack direction={'row'}></Stack>

                <RooftopContent widgets={<div>test</div>}></RooftopContent>
                <Typography>Recent transactions</Typography>
                <TransferDataGrid
                    transfers={testTransfers.slice(0, 5)}
                    loading={false}
                    sx={{
                        height: '500px',
                    }}
                ></TransferDataGrid>
            </Stack>
        </div>
    );
};

export default PortfolioContent;
