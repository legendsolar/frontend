import VerifyAccreditationContent from 'content/verify_accreditation_content';
export default () => (
    <VerifyAccreditationContent
        onAccreditationStatusSubmit={(items) => {
            console.log({items});
        }}
        loading={false}
    ></VerifyAccreditationContent>
);
