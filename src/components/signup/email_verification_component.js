import PropTypes from 'prop-types';
import {Grid, Box, TextField, Button, CircularProgress} from '@mui/material';
import {validateEmailVerifyCode} from 'validation/user_data_validation';

import {ErrorTypes} from 'utils/errors';

import {useFormik} from 'formik';
import * as yup from 'yup';

const EmailVerificationComponent = ({
    onSubmit,
    onSendVerifyEmail,
    emailSent,
    loading,
}) => {
    const initialValues = {
        emailVerifyCode: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            emailVerifyCode: validateEmailVerifyCode(),
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
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            disabled={!emailSent}
                            error={
                                formik.touched.emailVerifyCode &&
                                Boolean(formik.errors.emailVerifyCode)
                            }
                            helperText={
                                formik.touched.emailVerifyCode &&
                                formik.errors.emailVerifyCode
                            }
                            value={formik.values.emailVerifyCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="emailVerifyCode"
                            label="Code"
                            name="emailVerifyCode"
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="primary"
                    onClick={onSendVerifyEmail}
                    disabled={emailSent}
                    color="legendaryGreen"
                    sx={{width: '100%', mt: 4}}
                >
                    {loading ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Send verification email'
                    )}
                </Button>

                <Button
                    variant="primary"
                    onClick={formik.handleSubmit}
                    disabled={
                        formik.isValidating ||
                        formik.isSubmitting ||
                        !formik.dirty ||
                        !formik.isValid
                    }
                    color="legendaryGreen"
                    sx={{width: '100%', mt: 4}}
                >
                    {formik.isValidating || formik.isSubmitting ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Submit Code'
                    )}
                </Button>
            </form>
        </Box>
    );
};

export default EmailVerificationComponent;
