import SignUpComponent from '../components/user/sign_up_component';

const TestSignUp = () => {
    return (
        <SignUpComponent onSubmit={() => alert('onContinue')}></SignUpComponent>
    );
};

export default TestSignUp;
