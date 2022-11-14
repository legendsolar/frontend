import VerifyEmailContent from 'content/verify_email_content';
import delay from 'utils/delay';
export default () => (
    <VerifyEmailContent
        color="light"
        email="test_email@gmail.com"
        onChangeEmailAddressRequested={(email) => {
            console.log(email);
            return delay(1000);
        }}
        onSendVerificationEmailAgain={() => {
            console.log('onSendVerificationEmailAgain');
            return delay(1000);
        }}
    ></VerifyEmailContent>
);
