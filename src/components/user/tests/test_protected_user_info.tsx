import ProtectedUserInfo from '../protected_user_info';

const TestProtectedUserInfo = () => {
    return (
        <ProtectedUserInfo
            isValid={(valid) => console.log('valid: ' + valid)}
            fullSSNRequired={false}
            completed={false}
            handleChange={(values) => console.log({handleChange: values})}
            color="dark"
        ></ProtectedUserInfo>
    );
};

export default TestProtectedUserInfo;
