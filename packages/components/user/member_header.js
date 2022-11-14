import {Stack, Typography} from '@mui/material';
import {useDatabase, useDatabaseObjectData} from 'reactfire';
import {ref} from 'firebase/database';
import {useAuth} from 'hooks/use_auth';
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
