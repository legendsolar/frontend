import VerifyAccreditationContent from 'content/verify_accreditation_content';
import delay from 'utils/delay';
export default () => (
    <VerifyAccreditationContent
        onAccreditationStatusSubmit={(items) => {
            console.log({items});
            return delay(100);
        }}
    ></VerifyAccreditationContent>
);
