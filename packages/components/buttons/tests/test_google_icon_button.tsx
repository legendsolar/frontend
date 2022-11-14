import {Stack} from '@mui/material';
import IconButton from '../icon_button';
import {GoogleIcon} from '../icons/icons';

export const TestGoogleIconButton = () => {
    return (
        <IconButton
            variant={'small'}
            label="test label"
            onClick={() => alert('onClick')}
            icon={<GoogleIcon />}
            color={'whiteFog'}
            disabled={false}
        ></IconButton>
    );
};
