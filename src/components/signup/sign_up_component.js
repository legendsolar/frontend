import PropTypes from 'prop-types';
import {
    Alert,
    Grid,
    Box,
    Button,
    CircularProgress,
    Typography,
    Stack,
} from '@mui/material';

import TextField from 'utils/text_field';

import {
    validateAccessPhrase,
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePassword,
    validatePhoneNumber,
} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import LoadingText from 'components/utils/loading_text';

const SignUpComponent = ({initialValues, onSubmit, color = 'dark'}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
            firstName: validateFirstName(),
            lastName: validateLastName(),
            phone: validatePhoneNumber(),
            password: validatePassword(),
        }),
        onSubmit: async (values, {setErrors}) => {
            setLoading(true);
            onSubmit(values)
                .catch((error) => {
                    if (error.type === ErrorTypes.ValidationError) {
                        setErrors({
                            [error.source]: error.message,
                        });
                    }

                    if (error.type === ErrorTypes.SystemError) {
                        setError(error.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        onChange: () => {
            if (error) {
                setError(false);
            }
        },
    });

    const passwordHelper = '12 characters, 1 uppercase, 1 special';

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            color={color}
                            error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                            }
                            helperText={formik.errors.firstName}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="firstName"
                            label="First Name"
                            id="firstName"
                            autoComplete="given-name"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            disableUnderline
                            color={color}
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={formik.errors.lastName}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="lastName"
                            label="Last Name"
                            id="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            color={color}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={formik.errors.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            color={color}
                            error={
                                formik.touched.phone &&
                                Boolean(formik.errors.phone)
                            }
                            helperText={formik.errors.phone}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="tel-national"
                        />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <TextField
                            color={color}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.errors.password
                                    ? formik.errors.password
                                    : passwordHelper
                            }
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            alwaysDisplayHelper={true}
                        />
                    </Grid>
                </Grid>
                <Stack>
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
                        {formik.isValidating ||
                        formik.isSubmitting ||
                        loading ? (
                            <LoadingText></LoadingText>
                        ) : (
                            'Continue'
                        )}
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </form>
        </Box>
    );
};

SignUpComponent.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};

SignUpComponent.defaultProps = {
    initialValues: {
        email: '',
        password: '',
    },
};

export default SignUpComponent;
