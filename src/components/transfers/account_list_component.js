import {
    List,
    ListItem,
    Stack,
    Typography,
    Button,
    ListItemButton,
} from '@mui/material';
import PropTypes from 'prop-types';

const accountNumberString = '•••• •••• •••• ••••';

const AccountListComponent = ({accounts, onSelected}) => (
    <List>
        {accounts.map((account, index) => (
            <ListItemButton
                key={index}
                sx={{ml: -4, mr: -4}}
                onClick={() => {
                    if (onSelected) {
                        onSelected(account);
                    }
                }}
            >
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{width: '100%'}}
                >
                    <Stack>
                        <Typography variant="subtitle1">
                            {account.name}
                        </Typography>
                        <Typography variant="subtitle3">
                            {account.source}
                        </Typography>
                    </Stack>

                    <Stack alignItems={'flex-end'}>
                        <Typography variant="subtitle1">
                            {account.institution}
                        </Typography>
                        <Typography variant="subtitle3">
                            {accountNumberString}
                        </Typography>
                        <Button variant="button" disable={false}>
                            Transfer
                        </Button>
                    </Stack>
                </Stack>
            </ListItemButton>
        ))}
    </List>
);

AccountListComponent.propTypes = {
    accounts: PropTypes.array.isRequired,
};

AccountListComponent.defaultProps = {};
export default AccountListComponent;
