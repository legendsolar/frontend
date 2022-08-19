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

const ChangeEmailComponent = ({initialValues, onSubmit, color = 'dark'}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
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
                <TextField
                    color={color}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.errors.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                />

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
                            <CircularProgress color={color}></CircularProgress>
                        ) : (
                            'Resend Verification'
                        )}
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </form>
        </Box>
    );
};

ChangeEmailComponent.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};

ChangeEmailComponent.defaultProps = {
    initialValues: {
        email: '',
    },
};

export default ChangeEmailComponent;
