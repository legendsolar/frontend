import AccountCreateInfoContent from 'content/account_create_info_content';
import delay from 'utils/delay';
export default () => (
    <AccountCreateInfoContent
        color={'light'}
        onCreateAccount={(values) => {
            console.log(values);
            return delay(1000);
        }}
    ></AccountCreateInfoContent>
);
