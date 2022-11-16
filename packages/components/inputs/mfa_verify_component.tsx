import {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    CircularProgress,
    Alert,
    Stack,
    Typography,
} from '@mui/material';
import {validateMfaVerifyCode} from '@p/utils/validation';
import {LoadingText} from '../utils/loading_text';

import {TextField} from '../inputs/text_field';

import {ErrorTypes} from '@p/utils/errors';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface Values {
    code: string;
}

interface Props {
    initialValues?: Values;
    onSubmit(values: Values): Promise<void>;
    codeSent: boolean;
    onChangePhoneRequested(): void;
    color?: string;
    changePhoneAllowed?: boolean;
}

export const MfaVerifyComponent = ({
    initialValues = {code: ''},
    onSubmit,
    codeSent,
    onChangePhoneRequested,
    color = 'light',
    changePhoneAllowed = false,
}: Props) => {
    const [error, setError] = useState(null);

    const codeForm = useFormik({
        initialValues: initialValues,
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
                    helperText={codeForm.errors.code}
                    value={codeForm.values.code}
                    onChange={codeForm.handleChange}
                    onBlur={codeForm.handleBlur}
                    id="code"
                    label="Code"
                    name="code"
                />

                <Button
                    variant={'primary' as any}
                    onClick={() => codeForm.handleSubmit()}
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
                        <LoadingText></LoadingText>
                    ) : (
                        'Submit'
                    )}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}

                {changePhoneAllowed && (
                    <Stack
                        direction="row"
                        justifyContent={'flex-end'}
                        sx={{pl: 2, pr: 2}}
                    >
                        <Button
                            variant={'text'}
                            onClick={onChangePhoneRequested}
                        >
                            <Typography
                                variant={'smallLabel' as any}
                                color="legendaryGreen.main"
                                sx={{ml: 1}}
                            >
                                {'Re-Enter Phone Number'}
                            </Typography>
                        </Button>
                    </Stack>
                )}
            </Stack>
        </div>
    );
};

MfaVerifyComponent.propTypes = {
    initialPhoneNumberValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    initialValues: PropTypes.shape({
        code: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    onSendCode: PropTypes.func,
};

MfaVerifyComponent.defaultProps = {
    initialPhoneNumberValues: {
        phone: '',
    },
    initialValues: {
        code: '',
    },
    onSubmit: () => {},
    onSendCode: () => {},
};
