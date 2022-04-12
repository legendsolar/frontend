import AccountList from "../components/transactions/account_list_component";

const TestAccountList = () => <AccountList
    accounts={[
        {
            name: "Test Account 1",
            source: "Bank of America",
            institution: "Legends",
        },
        {
            name: "Test Account 2",
            source: "Chase",
            institution: "Legends",
        },
        {
            name: "Test Account 3",
            source: "Union Credit",
            institution: "Legends",
        }
    ]} 
    onSelected={(account) => {
        alert(`account selected: ${  JSON.stringify(account)}`);
    }}
    ></AccountList>

export default TestAccountList;