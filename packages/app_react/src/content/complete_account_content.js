import {SignUpOptionComponent} from '@project/components/signup/sign_up_option_component';
import {useState} from 'react';
import {Component} from '@project/components/basics/component';
import {useLocation, useNavigate} from 'react-router-dom';
import {Typography, Stack, Box, Button} from '@mui/material';
import {ROUTES} from 'routes/routes';
import {CompleteStepComponent} from '@project/components/signup/complete_step_component';

const CompleteAccountContent = ({stepsTitle, steps, onContinue}) => {
    const allComplete = steps.every((step) => step.complete);

    return (
        <Component sx={{background: 'none'}}>
            <Typography variant="headline2">{stepsTitle}</Typography>
            <Typography variant="body">
                {allComplete
                    ? 'You are ready to invest'
                    : 'You are almost ready to invest'}
            </Typography>

            {allComplete && (
                <Button variant={'primary'} onClick={onContinue}>
                    Continue to opportunities
                </Button>
            )}

            {steps.map((step, idx) => (
                <CompleteStepComponent
                    key={idx}
                    complete={step.complete}
                    title={step.title}
                    icon={step.icon}
                    onClick={step.onClick}
                    disabled={step.disabled}
                    disabledMessage={step.disabledMessage}
                    completeMessage={step.completeMessage}
                ></CompleteStepComponent>
            ))}
        </Component>
    );
};

export default CompleteAccountContent;
