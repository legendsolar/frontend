import AccountCreateInfoContent from './account_create_info_content';
import delay from '@p/utils/delay';
export default () => (
    <AccountCreateInfoContent
        color={'light'}
        onCreateAccount={(values) => {
            console.log(values);
            return delay(1000);
        }}
    ></AccountCreateInfoContent>
);
