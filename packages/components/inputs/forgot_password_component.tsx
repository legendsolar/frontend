import PropTypes from 'prop-types';
import {Typography, Stack, Box, Button, CircularProgress} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';

import TextField from '../inputs/text_field';
import {LoadingText} from '../utils/loading_text';
import {validateEmail} from '@p/utils/validation';
import {ErrorTypes} from '@p/utils/errors';
import {useState} from 'react';

interface Values {
    email: string;
}

interface Props {
    initialValues?: Values;
    onSubmit(values: Values): Promise<void>;
    onBackToSignIn(): void;
    color?: string;
}

export const ForgotPasswordComponent = ({
    initialValues = {email: ''},
    onSubmit,
    onBackToSignIn,
    color = 'dark',
}: Props) => {
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
                        variant={'primary' as any}
                        onClick={() => formik.handleSubmit()}
                        disabled={
                            formik.isValidating ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.isValid ||
                            resetLinkSent
                        }
                        color={'legendaryGreen' as any}
                        sx={{width: '100%', mt: 4}}
                    >
                        {formik.isValidating || formik.isSubmitting ? (
                            <LoadingText></LoadingText>
                        ) : (
                            buttonString
                        )}
                    </Button>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button variant="text" onClick={onBackToSignIn}>
                            <Typography
                                variant={'smallLabel' as any}
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
