import { Stack } from "@mui/material";
import ImageUpload from "../image_upload";

const IdentityVerificationDocument = ({ onComplete }) => {
    return (
        <Stack spacing={2}>
            <ImageUpload onComplete={onComplete}></ImageUpload>
        </Stack>
    );
};

export default IdentityVerificationDocument;
