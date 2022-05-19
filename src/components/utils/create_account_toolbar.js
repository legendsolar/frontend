import {Button} from '@mui/material';

const CreateAccountToolbar = ({onToHomepage}) => {
    return (
        <Button variant="header" disabled={false} onClick={onToHomepage}>
            Back to homepage
        </Button>
    );
};

export default CreateAccountToolbar;
