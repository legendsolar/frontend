import {Typography, Stack, Button, TextField} from '@mui/material';
import {useState} from 'react';
import {useCloudFunctions} from 'hooks/use_cloud_functions';

const IdentityVerificationFullSSN = ({onComplete}) => {
    const updateDwollaUser = useCloudFunctions().updateDwollaUser;

    const startingValues = {
        ssn: {
            value: '',
        },
    };

    const [formValues, setFormValues] = useState(startingValues);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        const updatedObject = {...formValues};
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    const formDataValid = (formData) => {
        if (!formData.ssn.value || !formData.ssn.value.match(/\d{9}/g)) {
            formData.ssn.error = true;
            formData.ssn.errMsg = 'SSN format invalid';
        } else {
            formData.ssn.error = false;
            formData.ssn.errMsg = undefined;
        }

        setFormValues(formData);
    };

    const continueAllowed = () => {
        const error = Object.keys(formValues)
            .map((key) => {
                return formValues[key].error;
            })
            .some((el) => el);

        return error;
    };

    const handleSubmit = () => {
        updateDwollaUser({
            ssn: formValues.ssn.value,
        })
            .then((resp) => {
                console.log(resp);
                onComplete();
            })
            .catch((error) => {
                console.log(error);
                const errorJson = JSON.parse(JSON.stringify(error));
                console.log(errorJson);
            });
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">Verify Identity</Typography>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>

            <TextField
                error={!!formValues.ssn.error}
                helperText={formValues.ssn.errMsg}
                name="ssn"
                label="Complete SSN"
                variant="filled"
                value={formValues.ssn.value}
                onChange={handleInputChange}
                fullWidth
            ></TextField>

            <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={continueAllowed()}
            >
                Continue
            </Button>
        </Stack>
    );
};

export default IdentityVerificationFullSSN;
