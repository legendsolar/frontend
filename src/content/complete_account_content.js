import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import {useState} from 'react';
import DefaultComponent from 'components/utils/default_component';
import {useLocation, useNavigate} from 'react-router-dom';
import {Typography, Stack, Box} from '@mui/material';
import {ROUTES} from 'routes/app_router';
import CompleteStepComponent from 'components/signup/complete_step_component';

const CompleteAccountContent = ({stepsTitle, steps}) => {
    return (
        <DefaultComponent>
            <Typography variant="headline2">{stepsTitle}</Typography>
            <Typography variant="body">
                You are almost ready to invest
            </Typography>

            {steps.map((step) => (
                <CompleteStepComponent
                    complete={step.complete}
                    title={step.title}
                    icon={step.icon}
                    onClick={step.onClick}
                ></CompleteStepComponent>
            ))}
        </DefaultComponent>
    );
};

export default CompleteAccountContent;
