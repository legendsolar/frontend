import BaseIcon from 'components/icons/base_icon';
import ArrowBackFilledSvg from 'assets/icons/arrow_back_filled.svg';
import WalletPng from 'assets/icons/wallet_icon.png';
import GoogleIconSvg from 'assets/icons/google_icon.svg';
import InstagramIconSvg from 'assets/icons/instagram_icon.svg';
import LinkIconSvg from 'assets/icons/link_icon.svg';
import LinkedInIconSvg from 'assets/icons/linkedin_icon.svg';
import TwitterIconSvg from 'assets/icons/twitter_icon.svg';
import DocumentSvg from 'assets/icons/document_icon.svg';
import PanelSvg from 'assets/icons/panel_icon.svg';
import {Box} from '@mui/material';
import CheckIconSvg from 'assets/icons/check_icon.svg';

export const ArrowBackIcon = ({sx}) => (
    <BaseIcon src={ArrowBackFilledSvg} alt="" sx={sx}></BaseIcon>
);

export const WalletIcon = ({sx = {}}) => {
    return <BaseIcon src={WalletPng} alt={'Wallet Icon'} sx={sx}></BaseIcon>;
};

export const GoogleIcon = ({sx = {}}) => {
    return <BaseIcon src={GoogleIconSvg} alt={'Bank Icon'} sx={sx}></BaseIcon>;
};

export const PanelIcon = ({sx = {}}) => {
    return (
        <BaseIcon
            src={PanelSvg}
            alt={'Panel Icon'}
            sx={{width: '53px', height: '26.5px', ...sx}}
        ></BaseIcon>
    );
};

export const DocumentIcon = ({sx = {}}) => {
    return (
        <BaseIcon src={DocumentSvg} alt={'Document Icon'} sx={sx}></BaseIcon>
    );
};

export const CheckIcon = ({sx = {}}) => {
    return (
        <BaseIcon src={CheckIconSvg} alt={'Check Icon Svg'} sx={sx}></BaseIcon>
    );
};

export const InstagramIcon = ({sx = {}}) => {
    return (
        <BaseIcon
            src={InstagramIconSvg}
            alt={'Instagram Icon'}
            sx={sx}
        ></BaseIcon>
    );
};
export const LinkIcon = ({sx = {}}) => {
    return <BaseIcon src={LinkIconSvg} alt={'Link Icon'} sx={sx}></BaseIcon>;
};
export const LinkedInIcon = ({sx = {}}) => {
    return (
        <BaseIcon
            src={LinkedInIconSvg}
            alt={'LinkedIn Icon'}
            sx={sx}
        ></BaseIcon>
    );
};
export const TwitterIcon = ({sx = {}}) => {
    return (
        <BaseIcon src={TwitterIconSvg} alt={'Twitter Icon'} sx={sx}></BaseIcon>
    );
};

export const CircledIcon = ({icon, sx = {}}) => (
    <Box
        sx={{
            display: 'flex',
            borderRadius: '50%',
            background: '#FFF',
            p: 2,
        }}
    >
        {icon}
    </Box>
);

export const RoundedBoxIcon = ({icon, sx = {}}) => (
    <Box
        sx={{
            display: 'flex',
            borderRadius: '10px',
            background: '#FFF',
            p: 2,
        }}
    >
        {icon}
    </Box>
);
