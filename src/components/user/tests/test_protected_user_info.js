import ProtectedUserInfo from '../protected_user_info';

const TestProtectedUserInfo = () => {
    return (
        <ProtectedUserInfo
            onSubmit={() => alert('onSumbit')}
            isValid={(valid) => console.log('valid: ' + valid)}
        ></ProtectedUserInfo>
    );
};

export default TestProtectedUserInfo;
