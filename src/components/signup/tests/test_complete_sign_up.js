import CompleteSignUp from '../complete_sign_up';

const TestCompleteSignUp = () => {
    return (
        <CompleteSignUp onComplete={() => alert('onComplete')}></CompleteSignUp>
    );
};

export default TestCompleteSignUp;
