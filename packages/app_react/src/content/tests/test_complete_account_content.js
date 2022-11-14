import CompleteAccountContent from './complete_account_content';
import {Typography} from '@mui/material';
export default () => (
    <CompleteAccountContent
        stepsTitle={'1/4'}
        steps={[
            {
                complete: false,
                title: 'Verify Email',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
                action: () => {},
            },
            {
                complete: true,
                title: 'Verify Phone Number',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
                action: () => {},
            },
            {
                complete: false,
                title: 'Verify Accreditation',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
                action: () => {},
            },
            {
                complete: false,
                title: 'Create Wallet',
                icon: <Typography variant="mediumEmoji">📞</Typography>,
                action: () => {},
            },
        ]}
    ></CompleteAccountContent>
);
