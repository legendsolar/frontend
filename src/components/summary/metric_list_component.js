import {Stack, Typography} from '@mui/material';
import MetricList from 'components/summary/metric_list';

const MetricListComponent = ({valuePairs, title}) => {
    return (
        <Stack spacing={4}>
            <Typography variant="smallHeadline">{title}</Typography>
            <MetricList valuePairs={valuePairs} dividers={true}></MetricList>
        </Stack>
    );
};

export default MetricListComponent;
