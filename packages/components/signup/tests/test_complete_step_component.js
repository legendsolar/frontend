import {Typography} from '@mui/material';
import {CompleteStepComponent} from '../complete_step_component';

export default () => (
    <CompleteStepComponent
        complete={true}
        title="Verify Something"
        icon={<Typography variant="mediumEmoji">📞</Typography>}
        onClick={() => {}}
    ></CompleteStepComponent>
);
