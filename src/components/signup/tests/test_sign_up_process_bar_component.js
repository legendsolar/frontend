import SignUpProcessBarComponent from '../sign_up_process_bar_component';
import {Typography} from '@mui/material';

export default () => (
    <SignUpProcessBarComponent
        processItems={[
            {
                title: 'Verify Phone',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
                onClick: () => {
                    console.log('Verify Phone');
                },
            },
            {
                title: 'Verify Email',
                icon: <Typography variant="mediumEmoji">📧</Typography>,
                onClick: () => {
                    console.log('Verify Email');
                },
            },

            {
                title: 'Accreditation',
                icon: <Typography variant="mediumEmoji">💰</Typography>,
                onClick: () => {
                    console.log('Accreditation');
                },
            },

            {
                title: 'Enable Transactions',
                icon: <Typography variant="mediumEmoji">🏦</Typography>,
                onClick: () => {
                    console.log('Enable Transactions');
                },
            },
        ]}
    ></SignUpProcessBarComponent>
);
