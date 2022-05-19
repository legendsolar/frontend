import SignUpComponent from '../sign_up_component';

const TestSignUp = () => {
    return (
        <SignUpComponent
            onSubmit={() => alert('onContinue')}
            customValidateData={async (values) => {
                console.log(values);
                await new Promise((r) => setTimeout(r, 2500));
                return true;
            }}
        ></SignUpComponent>
    );
};

export default TestSignUp;
