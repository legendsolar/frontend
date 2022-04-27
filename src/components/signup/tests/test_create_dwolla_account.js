import CreateDwollaAccount from '../create_dwolla_account';

const TestCreateDwollaAccount = () => {
    return (
        <CreateDwollaAccount
            userStatus={''}
            onSubmit={(values) => {
                alert('onSubmit:' + JSON.stringify(values));
            }}
        ></CreateDwollaAccount>
    );
};

export default TestCreateDwollaAccount;
