import {Stack, Typography} from '@mui/material';
import {useDatabase, useDatabaseObjectData} from 'reactfire';
import {ref} from 'firebase/database';
import {useAuth} from '../../hooks/use_auth';

const MemberHeader = ({sx}) => {
    const auth = useAuth();
    const user = auth.user;
    const database = useDatabase();
    const {status, data: userInfo} = useDatabaseObjectData(
        ref(database, 'users/' + user.uid),
    );
    const loading = status !== 'success';
    const name =
        loading || !userInfo?.info?.name
            ? '-'
            : `${userInfo.info.name.first} ${userInfo.info.name.last}`;
    const memberInfo = 'Member since 2022';

    return (
        <Stack sx={sx ? sx : {}} spacing={0}>
            <Typography variant="headline2">{name}</Typography>
            <Typography variant="smallLabel">{memberInfo}</Typography>
        </Stack>
    );
};

export default MemberHeader;
