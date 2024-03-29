import {Component} from '../basics/component';
import {Metric, MetricList} from './metric_list';
import {Typography} from '@mui/material';
import {ComponentDivider} from '../basics/component_divider';

export const MetricComponent = ({
    title,
    valuePairs,
}: {
    title: string;
    valuePairs: Array<Metric>;
}) => {
    return (
        <Component
            standardWidth={false}
            sx={{
                backgroundColor: 'whiteFog.main',
                width: '100%',
            }}
        >
            <Typography variant={'smallHeadline' as any}>{title}</Typography>
            <MetricList
                dividers
                valuePairs={valuePairs}
                dividerSx={{backgroundColor: 'white.main'}}
                dividerStart
            ></MetricList>
        </Component>
    );
};
