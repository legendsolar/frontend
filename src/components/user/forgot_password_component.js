import PropTypes from 'prop-types';
import {Typography, Stack, Box, Button, CircularProgress} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';

import TextField from 'utils/text_field';

import {validateEmail} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';
import {useState} from 'react';

const ForgotPasswordComponent = ({
    initialValues,
    onSubmit,
    onBackToSignIn,
    color,
}) => {
    const [resetLinkSent, setResetLinkSent] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
        }),
        onSubmit: async (values, {setErrors}) => {
            onSubmit(values)
                .then(() => {
                    setResetLinkSent(true);
                })
                .catch((error) => {
                    console.log('error');

                    if (error.type === ErrorTypes.ValidationError) {
                        setErrors({
                            [error.source]: error.message,
                        });
                    }
                });
        },
    });

    const buttonString = resetLinkSent ? 'Reset Link Sent' : 'Send Reset Link';

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Forgot Password</Typography>

                    <TextField
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        color={color}
                    />

                    <Button
                        variant="primary"
                        onClick={formik.handleSubmit}
                        disabled={
                            formik.isValidating ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.isValid ||
                            resetLinkSent
                        }
                        color="legendaryGreen"
                        sx={{width: '100%', mt: 4}}
                    >
                        {formik.isValidating || formik.isSubmitting ? (
                            <CircularProgress color="light"></CircularProgress>
                        ) : (
                            buttonString
                        )}
                    </Button>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button variant="text" onClick={onBackToSignIn}>
                            <Typography
                                variant="smallLabel"
                                color="legendaryGreen.main"
                                sx={{ml: 1}}
                            >
                                {'Back to Sign In'}
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

ForgotPasswordComponent.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onBackToSignIn: PropTypes.func.isRequired,
};

ForgotPasswordComponent.defaultProps = {
    initialValues: {
        email: '',
    },
};

export default ForgotPasswordComponent;
