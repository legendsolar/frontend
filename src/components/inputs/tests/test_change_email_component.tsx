import ChangeEmailComponent from '../change_email_component';

const TestModifyUserInfo = () => {
    return (
        <ChangeEmailComponent
            onSubmit={async (values) => console.log({onsubmit: {values}})}
        ></ChangeEmailComponent>
    );
};

export default TestModifyUserInfo;
