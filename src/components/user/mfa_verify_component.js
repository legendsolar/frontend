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
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';

const MfaVerifyComponent = ({
    initialCodeValues,
    onSubmit,
    codeSent,
    onChangePhoneRequested,
    color = 'dark',
}) => {
    const [error, setError] = useState(null);

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

                if (error.type == ErrorTypes.SystemError) {
                    setError(error.message);
                }

                if (error.type === ErrorTypes.NewLogInRequired) {
                    navigate('/signIn');
                }
            });
        },
    });

    return (
        <div>
            <Stack>
                <TextField
                    color={color}
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
                    sx={{width: '100%', mt: 4}}
                >
                    {codeForm.isValidating || codeForm.isSubmitting ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Submit'
                    )}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}

                <Stack
                    direction="row"
                    justifyContent={'flex-end'}
                    sx={{pl: 2, pr: 2}}
                >
                    <Button variant={'text'} onClick={onChangePhoneRequested}>
                        <Typography
                            variant={'smallLabel'}
                            color="legendaryGreen.main"
                            sx={{ml: 1}}
                        >
                            {'Re-Enter Phone Number'}
                        </Typography>
                    </Button>
                </Stack>
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