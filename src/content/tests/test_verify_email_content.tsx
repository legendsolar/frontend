import VerifyEmailContent from 'content/verify_email_content';
import delay from 'utils/delay';
export default () => <VerifyEmailContent
    email= "test_email@gmail.com"
    onChangeEmailAddressRequested={(email) => delay(1000)}
    onSendVerificationEmailAgain={() => delay(1000)}
></VerifyEmailContent>;