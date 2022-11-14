import {Component} from '../basics';
import {Stack, Typography} from '@mui/material';
import {typographyOptions} from '../theme';

export const MetricBox = ({metric, title, icon}) => {
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
                <Typography
                    variant={'headline1' as any}
                    sx={{
                        fontSize: {
                            xs: 25,
                            md: 35,
                            lg: typographyOptions.typography.headline1.fontSize,
                        },
                    }}
                >
                    {metric}
                </Typography>
                <Typography variant={'monoButton' as any}>{title}</Typography>
            </Stack>
        </Component>
    );
};
