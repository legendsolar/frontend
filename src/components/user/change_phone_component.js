import {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    CircularProgress,
    Collapse,
    Alert,
    Stack,
    Typography,
} from '@mui/material';

import TextField from 'utils/text_field';

import {states} from 'utils/static_lists';
import {
    validateMfaVerifyCode,
    validatePhoneNumber,
} from 'validation/user_data_validation';

import {ErrorTypes} from 'utils/errors';
import {useEffect} from 'react';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';

const ChangePhoneComponent = ({
    initialPhoneNumberValues,
    onSubmit,
    color = 'dark',
}) => {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: initialPhoneNumberValues,
        validationSchema: yup.object().shape({
            phone: validatePhoneNumber(),
        }),
        onSubmit: async (values, {setErrors}) => {
            onSubmit(values).catch((error) => {
                if (error.type === ErrorTypes.ValidationError) {
                    setErrors({
                        [error.source]: error.message,
                    });
                }

                if (error.type == ErrorTypes.SystemError) {
                    setError(error.message);
                }
            });
        },
    });

    return (
        <div>
            <Stack>
                <TextField
                    color={color}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.errors.phone}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="tel-national"
                />
                <Button
                    variant="primary"
                    onClick={formik.handleSubmit}
                    disabled={
                        formik.isValidating ||
                        formik.isSubmitting ||
                        !formik.dirty ||
                        !formik.isValid
                    }
                    sx={{width: '100%', mt: 4}}
                >
                    {formik.isValidating || formik.isSubmitting ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Resend confirmation'
                    )}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </div>
    );
};

ChangePhoneComponent.propTypes = {
    initialPhoneNumberValues: PropTypes.shape({
        phone: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
};

ChangePhoneComponent.defaultProps = {
    initialPhoneNumberValues: {
        phone: '',
    },
    onSubmit: () => {},
};

export default ChangePhoneComponent;
