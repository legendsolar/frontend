import {CompleteSignUp} from '../complete_sign_up';

export const TestCompleteSignUp = () => {
    return (
        <CompleteSignUp onComplete={() => alert('onComplete')}></CompleteSignUp>
    );
};
