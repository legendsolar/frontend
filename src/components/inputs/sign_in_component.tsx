import PropTypes from 'prop-types';
import {
    Typography,
    Stack,
    Box,
    TextField,
    Button,
    CircularProgress,
    Link,
} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {validateEmail, validatePassword} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';

interface SignInComponentProps {
    initialValues?: {
        email: string;
        password: string;
    };
    onSubmit({email, password}): Promise<void>;
    onForgotPassword(): void;
    onCreateNewAccount(): void;
    color: string;
}

const SignInComponent = ({
    initialValues = {email: '', password: ''},
    onSubmit,
    onForgotPassword,
    onCreateNewAccount,
    color,
}: SignInComponentProps) => {
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
                    <Typography variant={'smallHeadline' as any}>
                        Login
                    </Typography>

                    <Typography variant={'description' as any}>
                        Legends Solar is currently in closed beta. Please{' '}
                        <Typography
                            variant={'link' as any}
                            component={Link}
                            target={'_blank'}
                            sx={{textTransform: 'none'}}
                            href={'https://www.legends.solar/get-early-access'}
                        >
                            join our waitlist
                        </Typography>{' '}
                        to reserve your place when we launch.
                    </Typography>

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
                        color={color as any}
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
                        color={color as any}
                    />

                    <Button
                        variant={'primary' as any}
                        onClick={(e) => formik.handleSubmit()}
                        disabled={
                            formik.isValidating ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.isValid
                        }
                        color={'legendaryGreen' as any}
                        sx={{width: '100%', mt: 4}}
                    >
                        {formik.isValidating || formik.isSubmitting ? (
                            <CircularProgress
                                color={'light' as any}
                            ></CircularProgress>
                        ) : (
                            'Continue'
                        )}
                    </Button>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button
                            variant={'text' as any}
                            onClick={onForgotPassword}
                        >
                            <Typography
                                variant={'smallLabel' as any}
                                color="legendaryGreen.main"
                                sx={{ml: 1}}
                            >
                                {'Forgot Password'}
                            </Typography>
                        </Button>
                        <Button
                            variant={'text' as any}
                            onClick={onCreateNewAccount}
                        >
                            <Typography
                                variant={'smallLabel' as any}
                                color="legendaryGreen.main"
                                sx={{ml: 1}}
                            >
                                {'Create New Account'}
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default SignInComponent;