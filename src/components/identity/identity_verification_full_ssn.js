import { Typography, Stack, Button, TextField } from "@mui/material";
import ImageUpload from "../image_upload";
import MultiSelect from "../multiselect";
import { useEffect, useState } from "react";

const IdentityVerificationFullSSN = ({ onSubmit }) => {
    const startingValues = {
        ssn: {
            value: "",
        },
    };

    const [formValues, setFormValues] = useState(startingValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedObject = { ...formValues };
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    const formDataValid = (formData) => {
        if (!formData.ssn.value || !formData.ssn.value.match(/\d{7}/g)) {
            formData.ssn.error = true;
            formData.ssn.errMsg = "SSN format invalid";
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

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">Complete SSN</Typography>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>

            <TextField
                error={!!formValues.ssn.error}
                helperText={formValues.ssn.errMsg}
                name="ssn"
                label="Last four digits of SSN"
                variant="filled"
                value={formValues.ssn.value}
                onChange={handleInputChange}
                fullWidth
                type="password"
            ></TextField>

            <Button
                variant="primary"
                onClick={() => onSubmit()}
                disabled={continueAllowed()}
            >
                Continue
            </Button>
        </Stack>
    );
};

export default IdentityVerificationFullSSN;
