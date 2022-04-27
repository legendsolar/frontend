import PropTypes from 'prop-types';
import {
    Typography,
    Stack,
    Box,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import IconButton from 'components/buttons/icon_button';
import GoogleLogo from 'components/icons/google_logo';
import ContentDivider from 'components/basics/content_divider';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {validateEmail, validatePassword} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';

const SignInComponent = ({
    initialValues,
    onSubmit,
    onSignInWithGoogle,
    onForgotPassword,
    onCreateNewAccount,
}) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            email: validateEmail(),
            password: validatePassword(),
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
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Login</Typography>
                    <IconButton
                        label="Sign in with Google"
                        color="whiteHaze"
                        icon={<GoogleLogo height={'64px'}></GoogleLogo>}
                        onClick={onSignInWithGoogle}
                    ></IconButton>

                    <ContentDivider>
                        <Typography align="center" variant="smallLabel">
                            or
                        </Typography>
                    </ContentDivider>

                    <TextField
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />

                    <TextField
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
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

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button variant="mono" onClick={onForgotPassword}>
                            Forgot Password
                        </Button>
                        <Button variant="mono" onClick={onCreateNewAccount}>
                            Create New Account
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

SignInComponent.propTypes = {
    initialValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onSignInWithGoogle: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    onCreateNewAccount: PropTypes.func.isRequired,
};

SignInComponent.defaultProps = {
    initialValues: {
        email: '',
        password: '',
    },
};

export default SignInComponent;
