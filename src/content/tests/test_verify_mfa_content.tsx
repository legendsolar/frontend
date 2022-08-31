import VerifyMfaContent from 'content/verify_mfa_content';
import delay from 'utils/delay';
export default () => (
    <VerifyMfaContent
        onChangePhoneRequested={(newPhone) => {
            console.log(newPhone);
            return delay(1000);
        }}
        onMfaCodeSubmit={(code) => {
            console.log(code);
            return delay(1000);
        }}
        captchaComplete={() => {}}
    ></VerifyMfaContent>
);
