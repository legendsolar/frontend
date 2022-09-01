import {Stack, Typography, Tooltip} from '@mui/material';
import ComponentDivider from 'components/basics/component_divider';
import Divider from 'components/basics/divider';
import {nanoid} from 'nanoid';

export interface Metric {
    metric: string;
    value: string;
}

const MetricList = ({
    valuePairs,
    dividers = false,
}: {
    valuePairs: Array<Metric>;
    dividers?: boolean;
}) => {
    if (!valuePairs) {
        return <></>;
    }

    return (
        <Stack spacing={2} sx={{width: '100%', height: '100%'}}>
            {valuePairs.map(({metric, value}, index, list) => (
                <div key={nanoid()}>
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        alignItems="center"
                        key={metric + value}
                        sx={{
                            height: '53px',
                        }}
                    >
                        <Typography variant="subtitle1" color="blackDawn.main">
                            {metric}
                        </Typography>
                        <Typography
                            variant={
                                value.length > 12
                                    ? ('subtitle3' as any)
                                    : ('subtitle2' as any)
                            }
                            sx={{textAlign: 'right'}}
                        >
                            {value}
                        </Typography>
                    </Stack>
                    {dividers && index !== list.length - 1 && (
                        <ComponentDivider></ComponentDivider>
                    )}
                </div>
            ))}
        </Stack>
    );
};

export default MetricList;
