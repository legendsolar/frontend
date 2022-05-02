import React from 'react';
import {useTheme} from '@mui/material';
import {Paper, Stack, Divider, Box} from '@mui/material';
import {Typography} from '@mui/material';
import PanelsSvg from 'components/icons/panels_svg';
import DefaultComponent from 'components/utils/default_component';
import PropTypes from 'prop-types';

const AccountSummarySidebar = ({
    panelCount,
    costPerPanel,
    totalInvestment,
    kwTotal,
}) => {
    const theme = useTheme();

    const panelColor = theme.palette.skyBlue.main;

    const panels = Math.floor(Math.random() * 10 + 10);
    const kw_panel = 0.5;

    return (
        <DefaultComponent>
            <Stack sx={{p: 2}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {panelCount} Panels
                    </Typography>

                    <Typography variant="subtitle1">{kwTotal} Kw</Typography>
                </Stack>

                <PanelsSvg color={panelColor}></PanelsSvg>

                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="body1">${costPerPanel}</Typography>
                        <Typography variant="label">per panel</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="body1">
                            ${totalInvestment}
                        </Typography>
                        <Typography variant="label">
                            total investment
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </DefaultComponent>
    );
};

AccountSummarySidebar.propTypes = {
    panelCount: PropTypes.number,
    costPerPanel: PropTypes.number,
    totalInvestment: PropTypes.number,
    kwTotal: PropTypes.number,
};

AccountSummarySidebar.defaultProps = {
    panelCount: '-',
    costPerPanel: '-',
    totalInvestment: '-',
    kwTotal: '-',
};

export default AccountSummarySidebar;
