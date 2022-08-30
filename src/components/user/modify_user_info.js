import PropTypes from 'prop-types';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

import TextField from 'utils/text_field';

import {states} from 'utils/static_lists';
import {
    validateCity,
    validateFirstName,
    validateLastName,
    validatePostalCode,
    validateState,
    validateStreetAddress,
    validateStreetAddressTwo,
} from 'validation/user_data_validation';

import {ErrorTypes} from 'utils/errors';
import {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

const ModifyUserInfo = ({
    initialValues = {},
    onSubmit,
    isValid,
    handleChange,
    color = 'dark',
    disabled = false,
    userVerified = false,
}) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            streetAddress: validateStreetAddress(),
            streetAddress2: validateStreetAddressTwo(),
            city: validateCity(),
            state: validateState(),
            postalCode: validatePostalCode(),
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

    useEffect(() => {
        handleChange(formik.values);
    }, [formik.values]);

    useEffect(() => {
        const valid =
            !formik.isValidating &&
            !formik.isSubmitting &&
            formik.dirty &&
            formik.isValid;
        isValid(valid);
    }, [
        formik.isValidating,
        formik.isSubmitting,
        formik.dirty,
        formik.isValid,
    ]);

    return (
        <div>
            <Grid
                container
                columnSpacing={2}
                rowSpacing={1}
                sx={{width: '100%'}}
            >
                <Grid item xs={12} md={12}>
                    <TextField
                        color={color}
                        error={
                            formik.touched.streetAddress &&
                            Boolean(formik.errors.streetAddress)
                        }
                        helperText={formik.errors.streetAddress}
                        value={formik.values.streetAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={disabled}
                        id="streetAddress"
                        label="Street Address"
                        name="streetAddress"
                        autoComplete="streetAddress"
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField
                        color={color}
                        error={
                            formik.touched.streetAddress2 &&
                            Boolean(formik.errors.streetAddress2)
                        }
                        helperText={formik.errors.streetAddress2}
                        value={formik.values.streetAddress2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={disabled}
                        id="streetAddress2"
                        label="Apt Number, PO Box, ect (optional)"
                        name="streetAddress2"
                        autoComplete="streetAddress2"
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={5}>
                    <TextField
                        color={color}
                        name="city"
                        label="City"
                        error={
                            formik.touched.city && Boolean(formik.errors.city)
                        }
                        helperText={formik.errors.city}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={disabled}
                        autoComplete="city"
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControl
                        variant="filled"
                        fullWidth
                        color={color}
                        disabled={disabled}
                    >
                        <InputLabel>State</InputLabel>
                        <Select
                            helperText={'state'}
                            name="state"
                            value={
                                formik.values.state ? formik.values.state : ''
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {states.map((state) => {
                                return (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                );
                            })}
                        </Select>

                        {formik.touched.state &&
                        Boolean(formik.errors.state) ? (
                            <FormHelperText error>
                                {formik.touched.state && formik.errors.state}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        color={color}
                        name="postalCode"
                        label="Zip Code"
                        fullWidth
                        error={
                            formik.touched.postalCode &&
                            Boolean(formik.errors.postalCode)
                        }
                        helperText={formik.errors.postalCode}
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={disabled}
                        autoComplete="postalCode"
                    ></TextField>
                </Grid>
            </Grid>
        </div>
    );
};

ModifyUserInfo.propTypes = {
    initialValues: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        streetAddress: PropTypes.string,
        streetAddress2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postalCode: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
    isValid: PropTypes.func,
    handleChange: PropTypes.func,
};

ModifyUserInfo.defaultProps = {
    initialValues: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        postalCode: '',
    },
    isValid: (bool) => {},
    onSubmit: () => {},
    handleChange: () => {},
};

export default ModifyUserInfo;
