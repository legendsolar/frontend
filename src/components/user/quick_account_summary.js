import React from 'react';
import {useTheme} from '@mui/material';
import {Paper, Stack, Divider, Box} from '@mui/material';
import MetricList from '../summary/metric_list';
import {Typography} from '@mui/material';
import {useUser} from 'reactfire';
import PanelsSvg from '../icons/panels_svg';
import DefaultComponent from '../utils/default_component';

const QuickAccountSummary = (props) => {
    const user = useUser();
    const theme = useTheme();

    const panelColor = theme.palette.skyBlue.main;

    const panels = Math.floor(Math.random() * 10 + 10);
    const kw_panel = 0.5;

    return (
        <DefaultComponent>
            <Stack sx={{p: 2}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">{panels} Panels</Typography>

                    <Typography variant="subtitle1">
                        {panels * kw_panel} Kw
                    </Typography>
                </Stack>

                <PanelsSvg color={panelColor}></PanelsSvg>

                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="body1">$750</Typography>
                        <Typography variant="label">per panel</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="body1">${panels * 750}</Typography>
                        <Typography variant="label">
                            total investment
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </DefaultComponent>
    );
};
export default QuickAccountSummary;
