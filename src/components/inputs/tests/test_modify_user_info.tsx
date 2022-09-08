import {isValid} from 'date-fns';
import ModifyUserInfo from '../modify_user_info';

const TestModifyUserInfo = () => {
    return (
        <ModifyUserInfo
            isValid={(valid) => console.log({isValid: {valid}})}
            handleChange={(values) => console.log({handleChange: {values}})}
        ></ModifyUserInfo>
    );
};

export default TestModifyUserInfo;
