import CreateWalletContent from './create_wallet_content';
import {UserDwollaAccountData} from '@p/schema';
import delay from '@p/utils/delay';
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
