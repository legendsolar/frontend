import {Box} from '@mui/material';
import {ImgHTMLAttributes} from 'react';

const BaseIcon = ({sx = {}, src, alt = 'image'}) => {
    return (
        <Box
            src={src}
            sx={{width: '25px', height: '25px', ...sx}}
            component="img"
            alt={alt}
        ></Box>
    );
};

export default BaseIcon;
