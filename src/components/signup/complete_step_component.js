import {Typography, Stack} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';
import React from 'react';

const CompleteStepComponent = ({complete, title, icon, onClick}) => {
    const upperRightIcon = complete ? (
        <Typography variant="mediumEmoji">✅</Typography>
    ) : (
        <Typography variant="monoButton">Get Started</Typography>
    );

    return (
        <DefaultComponent paper>
            <Stack direction="row" justifyContent={'space-between'}>
                {icon} {upperRightIcon}
            </Stack>
            <Typography variant="subtitle1">{title}</Typography>
        </DefaultComponent>
    );
};

export default CompleteStepComponent;
