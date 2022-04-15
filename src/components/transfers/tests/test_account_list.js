import AccountListComponent from '../account_list_component';
import {accounts} from './defaults';

const TestAccountList = () => (
    <AccountListComponent
        accounts={accounts}
        onSelected={(account) => {
            alert(`account selected: ${JSON.stringify(account)}`);
        }}
    ></AccountListComponent>
);

export default TestAccountList;
