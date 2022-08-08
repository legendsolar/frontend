import BaseIcon from 'components/icons/base_icon';
import ArrowBackFilled from 'assets/icons/arrow_back_filled.svg';
import {Box} from '@mui/material';

export const ArrowBackIcon = ({sx}) => (
    <BaseIcon source={ArrowBackFilled} alt="Back arrow" sx={sx}></BaseIcon>
);

export const CircledIcon = ({icon, sx = {}}) => (
    <Box
        sx={{
            borderRadius: '50%',
            background: '#FFF',
            p: 2,
        }}
    >
        {icon}
    </Box>
);
