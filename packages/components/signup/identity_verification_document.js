import {Stack} from '@mui/material';
import {ImageUpload} from '../signup/image_upload';

export const IdentityVerificationDocument = ({onSubmit}) => {
    return (
        <Stack spacing={2}>
            <ImageUpload onComplete={onSubmit}></ImageUpload>
        </Stack>
    );
};
