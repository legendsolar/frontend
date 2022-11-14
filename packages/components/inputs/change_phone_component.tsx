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

import TextField from './text_field';

import {validatePhoneNumber} from '@p/utils/validation';

import {ErrorTypes} from '@p/utils/errors';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface Values {
    phone: string;
}

interface Props {
    initialValues?: Values;
    onSubmit(values: Values): Promise<void>;
    color?: string;
}

export const ChangePhoneComponent = ({
    initialValues = {phone: ''},
    onSubmit,
    color = 'dark',
}: Props) => {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues,
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
                    variant={'primary' as any}
                    onClick={() => formik.handleSubmit()}
                    disabled={
                        formik.isValidating ||
                        formik.isSubmitting ||
                        !formik.dirty ||
                        !formik.isValid
                    }
                    sx={{width: '100%', mt: 4}}
                >
                    {formik.isValidating || formik.isSubmitting ? (
                        <CircularProgress
                            color={'light' as any}
                        ></CircularProgress>
                    ) : (
                        'Send confirmation'
                    )}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
        </div>
    );
};
