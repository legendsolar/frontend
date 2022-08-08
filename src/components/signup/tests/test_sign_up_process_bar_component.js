import SignUpProcessBarComponent from '../sign_up_process_bar_component';
import {Typography} from '@mui/material';

export default () => (
    <SignUpProcessBarComponent
        processItems={[
            {
                title: 'Verify Phone',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
            },
            {
                title: 'Verify Email',
                icon: <Typography variant="mediumEmoji">📧</Typography>,
            },

            {
                title: 'Accreditation',
                icon: <Typography variant="mediumEmoji">💰</Typography>,
            },

            {
                title: 'Enable Transactions',
                icon: <Typography variant="mediumEmoji">🏦</Typography>,
            },
        ]}
    ></SignUpProcessBarComponent>
);
