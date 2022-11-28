import {Stack, Typography} from '@mui/material';
import PropTypes from 'prop-types';

export const MemberHeader = ({name, memberInfo, sx = {}}) => {
    return (
        <Stack sx={sx ? sx : {}} spacing={0}>
            <Typography variant="headline2">{name}</Typography>
            <Typography variant="smallLabel">{memberInfo}</Typography>
        </Stack>
    );
};

MemberHeader.propTypes = {
    name: PropTypes.string.isRequired,
    memberInfo: PropTypes.string,
};

MemberHeader.defaultProps = {
    memberInfo: '-',
};
