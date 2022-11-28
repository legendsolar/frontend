import {Button} from '@mui/material';

export const CreateAccountToolbar = ({onToHomepage}) => {
    return (
        <Button variant="header" disabled={false} onClick={onToHomepage}>
            Back to homepage
        </Button>
    );
};
