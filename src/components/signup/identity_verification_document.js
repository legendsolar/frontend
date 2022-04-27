import {Stack} from '@mui/material';
import ImageUpload from 'components/signup/image_upload';

const IdentityVerificationDocument = ({onSubmit}) => {
    return (
        <Stack spacing={2}>
            <ImageUpload onComplete={onSubmit}></ImageUpload>
        </Stack>
    );
};

export default IdentityVerificationDocument;
