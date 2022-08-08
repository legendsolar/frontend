import {Stack, Typography, Button} from '@mui/material';
import {CircledIcon} from 'components/icons/icons.js';
interface ProcessItem {
    title: string,
    icon: JSX.Element,
    onClick(): any 
}

interface SignUpProcessBarComponentProps {
    processItems: Array<ProcessItem>;
}


const SignUpProcessBarComponent = ({processItems} : SignUpProcessBarComponentProps) => {
    const processItem = ({title, icon, onClick} : ProcessItem, idx: number) => (
        <Button onClick={onClick}>

        <Stack alignItems={'center'} key={idx}>
            <CircledIcon icon={icon}></CircledIcon>
            <Typography variant={"subtitle3" as any}>{title}</Typography>
        </Stack>
        </Button>
    );

    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            {processItems.map(processItem)}
        </Stack>
    );
};

export default SignUpProcessBarComponent;
