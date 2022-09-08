import {Box, Typography, Container, Stack} from '@mui/material';
import PropTypes from 'prop-types';
import {typographyOptions} from 'app_theme';

import {WalletIcon, PanelIcon} from 'components/icons/icons';
import {BankIcon} from 'components/icons/emoji_icons';

const accountToIcon = (account) => {
    switch (account.type) {
        case 'WALLET':
            return <WalletIcon />;
        case 'SAVINGS':
            return <BankIcon />;
        case 'CHECKINGS':
            return <BankIcon />;
        default:
            return <BankIcon />;
    }
};

const transferToIconTypes = (transfer) => {
    if (transfer.type === 'DIVIDEND') {
        return {
            left: <PanelIcon />,
            right: <WalletIcon />,
        };
    }

    if (transfer.type === 'INVESTMENT') {
        return {
            left: <BankIcon></BankIcon>,
            right: <PanelIcon />,
        };
    }

    if (transfer.type === 'TRANSFER') {
        return {
            left: <WalletIcon />,
            right: <BankIcon />,
        };
    }

    const left = accountToIcon(transfer.sourceAccount);
    const right = accountToIcon(transfer.destinationAccount);

    return {
        left,
        right,
    };
};

const TransferComponent = ({transfer}) => {
    const {title, color, status, destinationName, sourceName, amount, created} =
        transfer;

    const amountString = (amount) => {
        try {
            return '$' + amount.toFixed(2);
        } catch {
            if (!amount.startsWith('$')) {
                return '$' + amount;
            }
            return amount;
        }
    };

    const {left, right} = transferToIconTypes(transfer);

    return (
        <Container sx={{width: '100%', minWidth: '320px'}}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={'flex-end'}
                sx={{m: 1}}
            >
                <Typography variant={'label' as any}>{title}</Typography>

                <Typography variant="subtitle2">
                    {amountString(amount)}
                </Typography>
            </Stack>

            <Container
                sx={{
                    height: '90px',
                    borderRadius: '5px',
                    position: 'relative',
                    backgroundColor: '#F4F5F5',
                }}
                style={{overflow: 'hidden'}}
            >
                <div
                    style={{
                        position: 'absolute',
                        transform: 'translate(-50%,-50%) rotate(45deg) ',
                        borderRadius: '5px',
                        top: '50%',
                        left: '0%',
                        width: '75%',
                        aspectRatio: '1 / 1',
                        backgroundColor: '#EBEBEB',
                    }}
                ></div>

                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                        height: '100%',
                        position: 'absolute',
                        left: '0',
                        right: '0',
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{width: '50%'}}
                    >
                        {left}
                    </Box>

                    <Box
                        display="flex"
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{width: '50%'}}
                    >
                        {right}
                    </Box>
                </Stack>

                <Box
                    sx={{
                        backgroundColor: color + '.main',
                        width: '20px',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Typography
                        sx={{
                            m: 0,
                            position: 'absolute',
                            color: color + '.contrastText',
                            top: '50%',
                            left: '50%',
                            transform:
                                'translateX(-50%) translateY(-50%) rotate(90deg);',

                            verticalAlign: 'middle',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            textTransform: 'uppercase',
                        }}
                        variant={'monoButton' as any}
                    >
                        {status ? status : 'Unknown'}
                    </Typography>
                </Box>
            </Container>

            <Stack direction="row" justifyContent="space-between" sx={{m: 1}}>
                <Typography variant={'label' as any}>{sourceName}</Typography>

                <Typography variant={'label' as any}>
                    {destinationName}
                </Typography>
            </Stack>
        </Container>
    );
};

TransferComponent.propTypes = {
    transfer: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
        status: PropTypes.string,
        destinationName: PropTypes.string,
        sourceName: PropTypes.string,
        amount: PropTypes.string,
    }).isRequired,
};

TransferComponent.defaultProps = {};

export default TransferComponent;
