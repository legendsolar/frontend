import VerifyMfaContent from 'content/verify_mfa_content';
import delay from 'utils/delay';
export default () => <VerifyMfaContent
onChangePhoneRequested={()=> delay(1000)}
onMfaCodeSubmit={()=> delay(1000)}
></VerifyMfaContent>;