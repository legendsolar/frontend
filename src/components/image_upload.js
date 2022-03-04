import { Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Fragment } from "react";

const ImageUpload = () => {
    const uploadInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const onChange = (event) => {
        console.log("uploaded?");
        console.log(event.target.value);
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };

    const imgSrc = () => {
        try {
            return URL.createObjectURL(selectedFile);
        } catch (error) {
            return null;
        }
    };

    return (
        <Fragment>
            {selectedFile && (
                <img alt="no image selected" height={"300px"} src={imgSrc()} />
            )}
            <Typography variant="description">
                {"[DEBUG] this is buggy on chome with macs"}
            </Typography>
            <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onChange}
            />
            <Button
                onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                }
                variant="contained"
            >
                Upload
            </Button>
        </Fragment>
    );
};

export default ImageUpload;
