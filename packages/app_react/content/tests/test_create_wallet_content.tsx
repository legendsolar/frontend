import CreateWalletContent from 'content/create_wallet_content';
import {UserDwollaAccountData} from 'schema/schema_gen_types';
import delay from 'utils/delay';
export default () => (
    <CreateWalletContent
        onSubmit={(input) => {
            console.log(input);
        }}
        fullSSNRequired={false}
        color={'light'}
        loading={false}
        error={undefined}
    ></CreateWalletContent>
);
