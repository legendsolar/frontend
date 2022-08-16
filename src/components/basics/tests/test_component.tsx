import {Divider, Stack, Typography} from '@mui/material';
import Component from '../component';
import ComponentDivider from '../component_divider';

export default () => {
    return (
        <Stack sx={{backgroundColor: 'whiteFog.main', p: 5}}>
            <Component>
                <Typography variant={'smallHeadline' as any}>
                    {' '}
                    Default Component
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </Typography>
            </Component>
            <Component>
                <Typography variant={'smallHeadline' as any}>
                    {' '}
                    Default Component: Divider
                </Typography>
                <ComponentDivider></ComponentDivider>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </Typography>
            </Component>
            <Component sx={{p: 10, backgroundColor: 'grassGreen.main'}}>
                <Typography variant={'smallHeadline' as any}>
                    {' '}
                    Default Component: arbitrary style
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </Typography>
            </Component>
            <Component shadow>
                <Typography variant={'smallHeadline' as any}>
                    {' '}
                    Default Component: shadow
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </Typography>
            </Component>
            <Component haze>
                <Typography variant={'smallHeadline' as any}>
                    {' '}
                    Default Component:haze
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </Typography>
            </Component>
        </Stack>
    );
};
