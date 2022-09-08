import React from 'react';
import {useTheme} from '@mui/material';
import {Paper, Stack, Divider, Box} from '@mui/material';
import {Typography} from '@mui/material';
import Component from 'components/basics/component';
import PropTypes from 'prop-types';

const AccountSummarySidebar = ({
    name,
    subtitle,
    panelCount,
    costPerPanel,
    totalInvestment,
    kwTotal,
}) => {
    const theme = useTheme();

    const panelColor = theme.palette.skyBlue.main;

    return (
        <Component>
            <Stack sx={{p: 2}}>
                <Stack spacing={0}>
                    <Typography variant="headline2">{name}</Typography>
                    <Typography variant="label">{subtitle}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {panelCount} Panels
                    </Typography>

                    <Typography variant="subtitle1">⚡{kwTotal} Kw</Typography>
                </Stack>

                {/* <PanelsSvg color={panelColor}></PanelsSvg> */}

                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="body1">${costPerPanel}</Typography>
                        <Typography variant="label">Cost per panel</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="body1">
                            ${totalInvestment}
                        </Typography>
                        <Typography variant="label">
                            Total investment
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Component>
    );
};

AccountSummarySidebar.propTypes = {
    panelCount: PropTypes.number,
    costPerPanel: PropTypes.number,
    totalInvestment: PropTypes.number,
    kwTotal: PropTypes.number,
    name: PropTypes.string,
    subtitle: PropTypes.string,
};

AccountSummarySidebar.defaultProps = {
    panelCount: '-',
    costPerPanel: '-',
    totalInvestment: '-',
    kwTotal: '-',
    name: 'Solar Investment',
    subtitle: null,
};

export default AccountSummarySidebar;
