import {
    List,
    ListItem,
    Stack,
    Typography,
    Button,
    ListItemButton,
} from '@mui/material';
import Divider from 'components/basics/divider';
import PropTypes from 'prop-types';

const accountNumberString = '•••• •••• •••• ';

const AccountListComponent = ({accounts, onSelected}) => (
    <div>
        {accounts.map((account, index) => (
            <div key={index}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{m: 4}}
                >
                    <Stack>
                        <Stack direction="row">
                            <Typography variant="smallLabel">
                                {account.type}
                            </Typography>
                            <Typography variant="smallLabel">
                                {accountNumberString + account.mask}
                            </Typography>
                        </Stack>
                        <Typography variant="headline2">
                            {account.name}
                        </Typography>
                    </Stack>

                    <Stack alignItems={'center'} sx={{height: '100%'}}>
                        <Button
                            variant="bubble"
                            sx={{color: 'legendaryGreen.main'}}
                            onClick={() => {
                                if (onSelected) {
                                    onSelected(account);
                                }
                            }}
                        >
                            Transfer
                        </Button>
                    </Stack>
                </Stack>

                {index !== accounts.length - 1 && <Divider></Divider>}
            </div>
        ))}
    </div>
);

AccountListComponent.propTypes = {
    accounts: PropTypes.array.isRequired,
    onSelected: PropTypes.func,
};

AccountListComponent.defaultProps = {
    onSelected: () => {},
};

export default AccountListComponent;
