import {Stack, Typography} from '@mui/material';
import {CircledIcon} from 'components/icons/icons.js';
import { FC } from "react";

interface ProcessItem {
    title: string,
    icon: JSX.Element
}

interface SignUpProcessBarComponentProps {
    processItems: Array<ProcessItem>;
}


const SignUpProcessBarComponent : FC<SignUpProcessBarComponentProps> = ({processItems}) => {
    // const processItem = ({title, icon}, idx) => (
    //     <Stack alignItems={'center'} key={idx}>
    //         <CircledIcon icon={icon}></CircledIcon>
    //         <Typography variant="subtitle3">{title}</Typography>
    //     </Stack>
    // );

    return (
        <div></div>
        // <Stack direction={'row'} justifyContent={'space-between'}>
        //     {processItems.map(processItem)}
        // </Stack>
    );
};

export default SignUpProcessBarComponent;
