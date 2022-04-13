import CreateTransactionComponent from "../components/transactions/create_transaction_component";
import { accounts } from "./test_data";

const TestCreateTransaction = () => {
    return <CreateTransactionComponent
        accounts={accounts}
        loading={false}
        onComplete={()=>alert("onComplete")}
    ></CreateTransactionComponent>
}

export default TestCreateTransaction;