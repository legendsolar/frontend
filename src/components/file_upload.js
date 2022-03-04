import { Button } from "@mui/material";

const FileUpload = () => {
    return (
        <Button component="label">
            Upload
            <input type="file" hidden />
        </Button>
    );
};

export default FileUpload;
