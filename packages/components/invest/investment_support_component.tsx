import {Typography, Stack, Box, Button} from '@mui/material';
import Component from '../basics/component';
import NeraPNG from 'assets/icons/nera.png';
import {EXTERNAL_LINKS} from 'webflow/webflowLinking';
import {CalendarIcon, EnvelopeIcon} from '../icons/emoji_icons';
interface InvestmentSupportComponentProps {
    title: string;
    subtitle: string;
    description: string;
    sx: any;
}

export const InvestmentSupportComponent = ({
    title,
    subtitle,
    description,
    sx,
}: InvestmentSupportComponentProps) => {
    return (
        <Component shadow sx={{...sx, p: 0, width: '100%'}}>
            <Stack sx={{m: 4}}>
                <Stack direction="row" justifyContent={'space-between'}>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <img
                            style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '5px',
                            }}
                            src={NeraPNG}
                        ></img>
                        <Stack justifyContent={'flex-end'}>
                            <Typography variant={'smallHeadline' as any}>
                                {title}
                            </Typography>
                            <Typography variant={'monoButton' as any}>
                                {subtitle}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent={'flex-end'}>
                        <Button
                            href={EXTERNAL_LINKS.TEAM.NERA}
                            variant="text"
                            target={'_blank'}
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'column',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            <CalendarIcon />
                            <Typography variant={'monoButton' as any}>
                                Meet
                            </Typography>
                        </Button>

                        <Button
                            href={EXTERNAL_LINKS.MAILTO.NERA}
                            variant="text"
                            target={'_blank'}
                            style={{marginTop: '5px', marginBottom: '5px'}}
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <EnvelopeIcon />
                            <Typography variant={'monoButton' as any}>
                                Email
                            </Typography>
                        </Button>
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
                <Button href={EXTERNAL_LINKS.TEAM.NERA} variant="text">
                    <Typography variant={'monoButton' as any}>
                        Biography
                    </Typography>
                </Button>
            </Box>
        </Component>
    );
};
