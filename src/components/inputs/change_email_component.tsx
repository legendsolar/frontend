import PropTypes from 'prop-types';
import {Alert, Grid, Box, Button, Stack} from '@mui/material';

import TextField from 'components/inputs/text_field';

import {validateEmail} from 'validation/user_data_validation';
import {ErrorTypes} from 'utils/errors';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import LoadingText from 'components/utils/loading_text';

interface Values {
    email: string;
}

interface Props {
    initialValues?: Values;
    onSubmit(values: Values): Promise<void>;
    color?: string;
    buttonMessage?: string;
}

const ChangeEmailComponent = ({
    initialValues = {email: ''},
    onSubmit,
    color = 'dark',
    buttonMessage = 'Resend Verification',
}: Props) => {
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
                        variant={'primary' as any}
                        onClick={() => formik.handleSubmit()}
                        disabled={
                            formik.isValidating ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            !formik.isValid
                        }
                        color={'legendaryGreen' as any}
                        sx={{width: '100%', mt: 4}}
                    >
                        {formik.isValidating ||
                        formik.isSubmitting ||
                        loading ? (
                            <LoadingText></LoadingText>
                        ) : (
                            buttonMessage
                        )}
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </form>
        </Box>
    );
};

export default ChangeEmailComponent;
