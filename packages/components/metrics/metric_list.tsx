import {Stack, Typography, Tooltip} from '@mui/material';
import {ComponentDivider} from '../basics/component_divider';
import {Divider} from '../basics/divider';
import {nanoid} from 'nanoid';

export interface Metric {
    metric: string;
    value: string;
}

export const MetricList = ({
    valuePairs,
    dividers = false,
    dividerSx = {},
    dividerStart = false,
}: {
    valuePairs: Array<Metric>;
    dividers?: boolean;
    dividerSx?: any;
    dividerStart?: boolean;
}) => {
    if (!valuePairs) {
        return <></>;
    }

    return (
        <Stack spacing={2} sx={{width: '100%', height: '100%'}}>
            {dividerStart && (
                <ComponentDivider sx={dividerSx}></ComponentDivider>
            )}
            {valuePairs.map(({metric, value}, index, list) => (
                <div key={nanoid()} style={{margin: '0px'}}>
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        alignItems="center"
                        key={metric + value}
                        sx={{
                            height: '53px',
                        }}
                    >
                        <Typography
                            variant={'subtitle3' as any}
                            color="blackDawn.main"
                        >
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
                        <ComponentDivider sx={dividerSx}></ComponentDivider>
                    )}
                </div>
            ))}
        </Stack>
    );
};
