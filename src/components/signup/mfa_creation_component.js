import {useState} from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormHelperText,
    CircularProgress,
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

const MfaCreationComponent = ({
    initialPhoneNumberValues,
    initialCodeValues,
    onSendCode,
    onSubmit,
}) => {
    const [codeSent, setCodeSent] = useState(false);

    const phoneForm = useFormik({
        initialValues: initialPhoneNumberValues,
        validationSchema: yup.object().shape({
            phone: validatePhoneNumber(),
        }),
        onSubmit: async (values, {setErrors}) => {
            values.phone = '+1' + values.phone;
            onSendCode(values)
                .catch((error) => {
                    if (error.type === ErrorTypes.ValidationError) {
                        setErrors({
                            [error.source]: error.message,
                        });
                    }
                })
                .then(() => setCodeSent(true));
        },
    });

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
            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid item xs={12} lg={6}>
                    <TextField
                        error={
                            phoneForm.touched.phone &&
                            Boolean(phoneForm.errors.phone)
                        }
                        helperText={
                            phoneForm.touched.phone && phoneForm.errors.phone
                        }
                        value={phoneForm.values.phone}
                        onChange={phoneForm.handleChange}
                        onBlur={phoneForm.handleBlur}
                        id="phone"
                        label="Phone Number"
                        name="phone"
                    />
                </Grid>

                <Button
                    variant="primary"
                    onClick={phoneForm.handleSubmit}
                    disabled={
                        phoneForm.isValidating ||
                        phoneForm.isSubmitting ||
                        !phoneForm.dirty ||
                        !phoneForm.isValid
                    }
                    color="legendaryGreen"
                    sx={{width: '100%', mt: 4}}
                >
                    {phoneForm.isValidating || phoneForm.isSubmitting ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Send Code'
                    )}
                </Button>

                <Grid item xs={12} lg={6}>
                    <TextField
                        disabled={!codeSent}
                        error={
                            codeForm.touched.code &&
                            Boolean(codeForm.errors.code)
                        }
                        helperText={
                            codeForm.touched.code && codeForm.errors.code
                        }
                        value={codeForm.values.code}
                        onChange={codeForm.handleChange}
                        onBlur={codeForm.handleBlur}
                        id="code"
                        label="Code"
                        name="code"
                    />
                </Grid>

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
            </Grid>
        </div>
    );
};

MfaCreationComponent.propTypes = {
    initialPhoneNumberValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    initialCodeValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    onSendCode: PropTypes.func,
};

MfaCreationComponent.defaultProps = {
    initialPhoneNumberValues: {
        phone: '',
    },
    initialCodeValues: {
        code: '',
    },
    onSubmit: () => {},
    onSendCode: () => {},
};

export default MfaCreationComponent;
