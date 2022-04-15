import AccountListComponent from 'components/transfers/account_list_component';
import {accounts} from 'tests/test_data';

const TestAccountList = () => (
    <AccountList
        accounts={accounts}
        onSelected={(account) => {
            alert(`account selected: ${JSON.stringify(account)}`);
        }}
    ></AccountList>
);

export default TestAccountList;
