import PropTypes from 'prop-types';
import {
    Alert,
    Grid,
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Stack,
} from '@mui/material';
import {
    validateAccessPhrase,
    validateEmail,
    validatePassword,
} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';

const SignUpComponent = ({initialValues, onSubmit}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
            password: validatePassword(),
            accessPhrase: validateAccessPhrase(),
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

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="label">
                            Legends Solar is currently in closed beta. Please{' '}
                            <a
                                href={
                                    'https://www.legends.solar/get-early-access'
                                }
                            >
                                join our waitlist
                            </a>{' '}
                            to reserve your place when we launch.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={12}>
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

                    <Grid item xs={12} lg={12}>
                        <Stack>
                            <Typography variant="label">
                                Personal access phrase sent in our offer for you
                                to join Legends. This code must match the email
                                it was sent to.
                            </Typography>
                            <TextField
                                error={
                                    formik.touched.accessPhrase &&
                                    Boolean(formik.errors.accessPhrase)
                                }
                                helperText={
                                    formik.touched.accessPhrase &&
                                    formik.errors.accessPhrase
                                }
                                value={formik.values.accessPhrase}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="accessPhrase"
                                label="Access Phrase"
                                type="password"
                                id="accessPhrase"
                            />
                        </Stack>
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
                            <CircularProgress color="light"></CircularProgress>
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
