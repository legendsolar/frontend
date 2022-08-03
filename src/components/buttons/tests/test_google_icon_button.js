import {Stack} from '@mui/material';
import IconButton from '../icon_button';
import GoogleLogo from 'components/icons/google_logo';

const TestGoogleIconButton = () => {
    return (
        <IconButton
            variant={'small'}
            label="test label"
            onClick={() => alert('onClick')}
            icon={<GoogleLogo height={'64px'}></GoogleLogo>}
            color={'whiteFog'}
        ></IconButton>
    );
};

export default TestGoogleIconButton;
