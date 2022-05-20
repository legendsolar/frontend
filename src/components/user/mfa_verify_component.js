import {useState} from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Button,
    CircularProgress,
    Collapse,
    Alert,
    Stack,
    Typography,
} from '@mui/material';
import {states} from 'utils/static_lists';
import {
    validateMfaVerifyCode,
    validatePhoneNumber,
} from 'validation/user_data_validation';

import {ErrorTypes} from 'utils/errors';
import {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {transformPhoneNumber} from 'transformers/user_input_transformers';

const MfaVerifyComponent = ({
    initialCodeValues,
    onSendCode,
    onSubmit,
    codeSent,
}) => {
    const codeForm = useFormik({
        initialValues: initialCodeValues,
        validationSchema: yup.object().shape({
            code: validateMfaVerifyCode(),
        }),
        onSubmit: async (values, {setErrors}) => {
            onSubmit(values).catch((error) => {
                if (error.type === ErrorTypes.ValidationError) {
                    setErrors({
                        [error.source]: error.message,
                    });
                }
            });
        },
    });

    return (
        <div>
            <Stack>
                <Typography variant="subtitle1">Verify MFA </Typography>
                <Typography variant="label">
                    We've sent you a code to verify your identity.
                </Typography>

                <TextField
                    disabled={!codeSent}
                    error={
                        codeForm.touched.code && Boolean(codeForm.errors.code)
                    }
                    helperText={codeForm.touched.code && codeForm.errors.code}
                    value={codeForm.values.code}
                    onChange={codeForm.handleChange}
                    onBlur={codeForm.handleBlur}
                    id="code"
                    label="Code"
                    name="code"
                />

                <Button
                    variant="primary"
                    onClick={codeForm.handleSubmit}
                    disabled={
                        codeForm.isValidating ||
                        codeForm.isSubmitting ||
                        !codeForm.dirty ||
                        !codeForm.isValid ||
                        !codeSent
                    }
                    color="legendaryGreen"
                    sx={{width: '100%', mt: 4}}
                >
                    {codeForm.isValidating || codeForm.isSubmitting ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Submit Code'
                    )}
                </Button>
            </Stack>
        </div>
    );
};

MfaVerifyComponent.propTypes = {
    initialPhoneNumberValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    initialCodeValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    onSendCode: PropTypes.func,
};

MfaVerifyComponent.defaultProps = {
    initialPhoneNumberValues: {
        phone: '',
    },
    initialCodeValues: {
        code: '',
    },
    onSubmit: () => {},
    onSendCode: () => {},
};

export default MfaVerifyComponent;
