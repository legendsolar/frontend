import {isValid} from 'date-fns';
import ModifyUserInfo from '../modify_user_info';

const TestModifyUserInfo = () => {
    return (
        <ModifyUserInfo
            onSubmit={() => alert('onSubmit')}
            isValid={(valid) => console.log('valid: ' + valid)}
        ></ModifyUserInfo>
    );
};

export default TestModifyUserInfo;
