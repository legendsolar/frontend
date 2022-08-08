import {Stack, Typography} from '@mui/material';
import {CircledIcon} from 'components/icons/icons';

const SignUpProcessBarComponent = ({processItems}) => {
    const processItem = ({title, icon}, idx) => (
        <Stack alignItems={'center'} key={idx}>
            <CircledIcon icon={icon}></CircledIcon>
            <Typography variant="subtitle3">{title}</Typography>
        </Stack>
    );

    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            {processItems.map(processItem)}
        </Stack>
    );
};

export default SignUpProcessBarComponent;
