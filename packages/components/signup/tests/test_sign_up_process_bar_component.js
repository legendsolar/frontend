import {SignUpProcessBarComponent} from '../sign_up_process_bar_component';
import {Typography} from '@mui/material';

export const TEST_PROCESS_ITEMS = [
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
];

export default () => (
    <SignUpProcessBarComponent
        processItems={TEST_PROCESS_ITEMS}
    ></SignUpProcessBarComponent>
);
