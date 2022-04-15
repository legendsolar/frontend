import {Box, Stack} from '@mui/material';
import Divider from 'components/basics/divider';

const ContentDivider = ({sx, children}) => {
    return (
        <Stack
            direction="row"
            sx={{
                width: '100%',
                ...sx,
            }}
            justifyContent="center"
            alignItems="center"
        >
            <Divider sx={{mr: 0, width: '100%'}} />
            {children}
            <Divider sx={{ml: 2, width: '100%'}} />
        </Stack>
    );
};

export default ContentDivider;
