import {AccountListComponent} from '../account_list_component';
import {accounts} from './defaults';

export const TestAccountList = () => (
    <AccountListComponent
        accounts={accounts}
        onAddAccount={() => alert('onAddAccount')}
        onCreateTransfer={(account) =>
            alert('onCreateTransfer= ' + JSON.stringify(account))
        }
        onUnlinkAccount={(account) =>
            alert('onUnlinkAccount= ' + JSON.stringify(account))
        }
    ></AccountListComponent>
);
