import AccountList from "../components/transactions/account_list_component";
import {accounts} from "./test_data"

const TestAccountList = () => <AccountList
    accounts={accounts} 
    onSelected={(account) => {
        alert(`account selected: ${  JSON.stringify(account)}`);
    }}
    ></AccountList>

export default TestAccountList;