import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import {TextField} from '../inputs/text_field';

import {useEffect} from 'react';
import {months} from '../utils/static_lists';
import {
    validateMonth,
    validateDay,
    validateYear,
    validateSSN,
} from '@p/utils/validation';

import {ErrorTypes} from '@p/utils/errors';

import {useFormik} from 'formik';
import * as yup from 'yup';

interface Values {
    ssn: string;
    day: number;
    month: string;
    year: string;
}

interface ProtectedUserInfoProps {
    initialValues?: Values;
    fullSSNRequired: boolean;
    completed: boolean;
    isValid(valid: boolean): void;
    handleChange(values: Values): void;
    color: string;
}

export const ProtectedUserInfo = ({
    initialValues = {ssn: '', day: 0, month: '', year: ''},
    fullSSNRequired,
    completed,
    isValid,
    handleChange,
    color = 'dark',
}: ProtectedUserInfoProps) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            ssn: validateSSN(),
            day: validateDay(),
            month: validateMonth(),
            year: validateYear(),
        }),

        onSubmit: async (values, {setErrors}) => {},
    });

    useEffect(() => {
        handleChange(formik.values);
    }, [formik.values]);

    useEffect(() => {
        isValid(
            !(
                formik.isValidating ||
                formik.isSubmitting ||
                !formik.dirty ||
                !formik.isValid
            ),
        );
    }, [
        formik.isValidating,
        formik.isSubmitting,
        formik.dirty,
        formik.isValid,
    ]);

    return (
        <Grid container spacing={2} sx={{width: '100%'}}>
            <Grid item xs={12} md={3} lg={3}>
                <Typography variant={'subtitle3' as any}>{'SSN '}</Typography>
                <TextField
                    color={color}
                    data-private
                    disabled={completed}
                    name="ssn"
                    label={fullSSNRequired ? 'Complete SSN' : 'Last four'}
                    type="password"
                    error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                    helperText={formik.errors.ssn}
                    value={formik.values.ssn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="ssn"
                ></TextField>
            </Grid>

            <Grid item xs={12} md={9} lg={9}>
                <Typography variant={'subtitle3' as any}>Birthday</Typography>

                <Grid container spacing={0} sx={{width: '100%'}}>
                    <Grid item xs={6} md={6}>
                        <FormControl
                            color={color as any}
                            variant="filled"
                            fullWidth
                            disabled={completed}
                            data-private
                        >
                            <InputLabel>Month</InputLabel>
                            <Select
                                name="month"
                                value={
                                    formik.values.month
                                        ? formik.values.month
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {months.map((month) => {
                                    return (
                                        <MenuItem
                                            key={month}
                                            value={completed ? '••••' : month}
                                        >
                                            {completed ? '••••' : month}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            color={color}
                            data-private
                            disabled={completed}
                            name="day"
                            label="DD"
                            variant={'filled' as any}
                            type={completed ? 'string' : 'number'}
                            error={
                                formik.touched.day && Boolean(formik.errors.day)
                            }
                            helperText={formik.errors.day}
                            value={formik.values.day}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="ssn"
                        ></TextField>
                    </Grid>

                    <Grid item xs={3} md={3}>
                        <TextField
                            color={color}
                            data-private
                            disabled={completed}
                            name="year"
                            label="YYYY"
                            error={
                                formik.touched.year &&
                                Boolean(formik.errors.year)
                            }
                            helperText={formik.errors.year}
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="year"
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ProtectedUserInfo.propTypes = {
    initialValues: PropTypes.shape({
        ssn: PropTypes.string,
        day: PropTypes.string,
        month: PropTypes.string,
        year: PropTypes.string,
    }),
    fullSSNRequired: PropTypes.bool,
    completed: PropTypes.bool,
    onSubmit: PropTypes.func,
    isValid: PropTypes.func,
};

ProtectedUserInfo.defaultProps = {
    initialValues: {
        ssn: '',
        day: '',
        month: '',
        year: '',
    },
    fullSSNRequired: false,
    completed: false,
    isValid: (bool) => {},
    onSubmit: () => {},
};
