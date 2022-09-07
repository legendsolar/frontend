import {Stack, Typography, Button} from '@mui/material';
import {CircledIcon} from 'components/icons/icons';
export interface SignUpProcessItem {
    title: string;
    icon: JSX.Element;
    onClick(): any;
}

interface SignUpProcessBarComponentProps {
    processItems: Array<SignUpProcessItem>;
    sx: any;
}

const SignUpProcessBarComponent = ({
    processItems,
    sx = {},
}: SignUpProcessBarComponentProps) => {
    const processItem = (
        {title, icon, onClick}: SignUpProcessItem,
        idx: number,
    ) => (
        <Button onClick={onClick}>
            <Stack alignItems={'center'} key={idx}>
                <CircledIcon icon={icon}></CircledIcon>
                <Typography variant={'subtitle3' as any}>{title}</Typography>
            </Stack>
        </Button>
    );

    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={sx}>
            {processItems.map(processItem)}
        </Stack>
    );
};

export default SignUpProcessBarComponent;
