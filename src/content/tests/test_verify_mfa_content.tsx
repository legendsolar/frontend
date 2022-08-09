import VerifyMfaContent from 'content/verify_mfa_content';
import delay from 'utils/delay';
export default () => (
    <VerifyMfaContent
        onChangePhoneRequested={(newPhone) => delay(1000)}
        onMfaCodeSubmit={(code) => delay(1000)}
    ></VerifyMfaContent>
);
