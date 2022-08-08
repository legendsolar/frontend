import {Box} from '@mui/material';

const BaseIcon = ({source, sx, alt}) => {
    return <Box component="img" sx={sx} src={source} alt={alt}></Box>;
};

export default BaseIcon;
