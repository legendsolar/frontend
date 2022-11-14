import {Box} from '@mui/material';
import {borderRadius} from '@mui/system';

const Image = ({src, sx = {}}) => (
    <Box component="img" sx={{borderRadius: '5px', ...sx}} src={src}></Box>
);

export default Image;
