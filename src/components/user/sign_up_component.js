import PropTypes from 'prop-types';
import {useState} from 'react';
import {Grid, Box, TextField, Button, CircularProgress} from '@mui/material';
import {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateLastName,
    validateFirstName,
} from 'validation/user_data_validation';

import {useFormik} from 'formik';
import * as yup from 'yup';

const SignUpComponent = ({initialValues, customValidateData, onSubmit}) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
            password: validatePassword(),
            firstName: validateFirstName(),
            lastName: validateLastName(),
            phoneNumber: validatePhoneNumber(),
        }),
        onSubmit: async (values) => {
            const valid = await customValidateData(values);
            if (valid) {
                onSubmit(values);
            }
        },
    });

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                            }
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                            }
                            helperText={
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                            }
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="phoneNumber"
                            label="Phone number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                        />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <TextField
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                </Grid>

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
                        'Continue'
                    )}
                </Button>
            </form>
        </Box>
    );
};

SignUpComponent.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
    }),
    customValidateData: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
};

SignUpComponent.defaultProps = {
    initialValues: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    },
    customValidateData: () => {},
};

export default SignUpComponent;
