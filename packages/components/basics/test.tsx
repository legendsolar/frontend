import {useTheme} from '@mui/material';
import {LivePill} from '../pills';

export const Test = () => {
    const theme = useTheme();

    return (
        <div>
            <LivePill />
            {theme.palette.primary.main}
        </div>
    );
};
