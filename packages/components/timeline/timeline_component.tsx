import {Stack, Typography, Box, Grid} from '@mui/material';
import {ComponentDivider} from '../basics/component_divider';
import {Divider} from '../basics/divider';
import {legendaryGreen} from '../static/colors';

export interface TimelineStep {
    title: string;
    description: string;
    linkBubble?: JSX.Element;
}

export interface TimelineComponentProps {
    steps: Array<TimelineStep>;
}

export const TimelineComponent = ({steps}: TimelineComponentProps) => {
    return (
        <Box
            sx={{
                backgroundColor: 'whiteHaze.main',
                position: 'relative',
                p: 0,
                borderRadius: '5px',
            }}
        >
            {steps.map((step, idx) => (
                <Grid container>
                    <Grid
                        item
                        xs={3}
                        sx={{borderRight: `solid ${legendaryGreen} 15px`}}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{fontWeight: '800', fontSize: '35px'}}
                            >
                                {idx + 1}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9} sx={{p: 4}}>
                        <Stack
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Typography variant={'subtitle1' as any}>
                                {step.title}
                            </Typography>
                            <Typography>{step.description}</Typography>
                            {step.linkBubble}
                        </Stack>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default TimelineComponent;
