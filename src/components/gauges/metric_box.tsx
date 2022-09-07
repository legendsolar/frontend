import Component from 'components/basics/component';
import {Stack, Typography} from '@mui/material';

const MetricBox = ({metric, title, icon}) => {
    return (
        <Component
            standardWidth={false}
            sx={{
                backgroundColor: 'none',
                width: '100%',
            }}
        >
            <Stack spacing={1}>
                {icon}
                <Typography variant={'headline1' as any}>{metric}</Typography>
                <Typography variant={'monoButton' as any}>{title}</Typography>
            </Stack>
        </Component>
    );
};

export default MetricBox;
