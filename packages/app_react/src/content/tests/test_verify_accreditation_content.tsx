import VerifyAccreditationContent from './verify_accreditation_content';
export default () => (
    <VerifyAccreditationContent
        onAccreditationStatusSubmit={(items) => {
            console.log({items});
        }}
        loading={false}
    ></VerifyAccreditationContent>
);
