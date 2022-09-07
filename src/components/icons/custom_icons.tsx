import BaseIcon from 'components/icons/base_icon';
import WalletPng from 'assets/icons/wallet_icon.png';

export const WalletIcon = (sx = {}) => {
    return <BaseIcon src={WalletPng} alt={'Wallet Icon'} sx={sx}></BaseIcon>;
};
