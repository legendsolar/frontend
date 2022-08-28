import {Typography, Stack, Box} from '@mui/material';
import Component from 'components/basics/component';
import NeraPNG from 'assets/icons/nera.png';
interface InvestmentSupportComponentProps {
    title: string;
    subtitle: string;
    description: string;
    sx: any;
}

const InvestmentSupportComponent = ({
    title,
    subtitle,
    description,
    sx,
}: InvestmentSupportComponentProps) => {
    return (
        <Component shadow sx={{...sx, p: 0}}>
            <Stack sx={{m: 4}}>
                <Stack direction="row" justifyContent={'space-between'}>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <img src={NeraPNG}></img>
                        <Stack justifyContent={'flex-end'}>
                            <Typography variant={'smallHeadline' as any}>
                                {title}
                            </Typography>
                            <Typography variant={'monoButton' as any}>
                                {subtitle}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent={'space-between'}>
                        <Stack
                            justifyContent={'flex-end'}
                            alignItems={'center'}
                        >
                            <Typography variant={'mediumEmoji' as any}>
                                {'📅'}
                            </Typography>
                            <Typography variant={'monoButton' as any}>
                                Meet
                            </Typography>
                        </Stack>

                        <Stack
                            justifyContent={'flex-end'}
                            alignItems={'center'}
                        >
                            <Typography variant={'mediumEmoji' as any}>
                                {'✉️'}
                            </Typography>
                            <Typography variant={'monoButton' as any}>
                                Email
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Typography variant={'body' as any}>{description}</Typography>
            </Stack>
            <Box
                sx={{
                    backgroundColor: 'whiteHaze.main',
                    height: '45px',
                    pr: 4,
                }}
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
            >
                <Typography variant={'monoButton' as any}>Biography</Typography>
            </Box>
        </Component>
    );
};

export default InvestmentSupportComponent;
