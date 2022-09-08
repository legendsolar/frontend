import ChangePhoneComponent from '../change_phone_component';

const TestModifyUserInfo = () => {
    return (
        <ChangePhoneComponent
            onSubmit={async (values) => console.log({onsubmit: {values}})}
        ></ChangePhoneComponent>
    );
};

export default TestModifyUserInfo;
