import CreateWalletContent from 'content/create_wallet_content';
import {UserDwollaAccountData} from 'schema/schema_gen_types';
import delay from 'utils/delay';
export default () => (
    <CreateWalletContent
        onSubmit={(input: UserDwollaAccountData) => {
            console.log(input);
            return delay(1000);
        }}
        fullSSNRequired={false}
        color={'light'}
    ></CreateWalletContent>
);
