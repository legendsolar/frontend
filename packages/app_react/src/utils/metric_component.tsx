import {Component} from '@project/components/basics/component';
import MetricList, {Metric} from '../summary/metric_list';
import {Typography} from '@mui/material';
import {ComponentDivider} from '@project/components/basics/component_divider';

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
