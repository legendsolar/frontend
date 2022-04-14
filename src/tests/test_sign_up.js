import SignUpComponent from '../components/user/sign_up_component';

const TestSignUp = () => {
    return (
        <SignUpComponent
            onSubmit={() => alert('onContinue')}
            customValidateData={async (values) => {
                console.log('passed to parent:');
                console.log(values);
                console.log('simulating validation...');
                await new Promise((r) => setTimeout(r, 2500));
            }}
        ></SignUpComponent>
    );
};

export default TestSignUp;
