import {Button, Typography, Alert} from '@mui/material';
import {useRef, useState} from 'react';
import {Fragment} from 'react';

export const ImageUpload = ({onComplete}) => {
    const uploadInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const onChange = (event) => {
        // console.log('uploaded?');
        // console.log(event.target.value);
        // console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };

    const imgSrc = () => {
        try {
            return URL.createObjectURL(selectedFile);
        } catch (error) {
            return null;
        }
    };

    const submitImage = () => {
        // const reader = new FileReader();
        // reader.onloadend = function () {
        //     receiveIdVerificationDocument({
        //         image: reader.result,
        //     })
        //         .then((resp) => {
        //             console.log('dwolla resp:');
        //             console.log(resp);
        //             onComplete();
        //         })
        //         .catch((error) => {
        //             console.log('dwolla error resp:');
        //             console.log(error);
        //             const errorJson = JSON.parse(JSON.stringify(error));
        //             console.log(errorJson);
        //             setAlertMessage(errorJson.details.message);
        //         });
        // };
        // reader.readAsDataURL(selectedFile);
    };

    return (
        <Fragment>
            {selectedFile && (
                <img
                    alt="no image selected"
                    max-height={'300px'}
                    src={imgSrc()}
                />
            )}
            <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={onChange}
            />

            {alertMessage && (
                <Alert severity="error">
                    {'Sorry, retry! ' + alertMessage}
                </Alert>
            )}

            <Button
                onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                }
                variant={'secondary'}
            >
                Upload Image
            </Button>

            <Button onClick={() => submitImage()} variant={'primary'}>
                Submit Image
            </Button>
        </Fragment>
    );
};
