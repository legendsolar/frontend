import {
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useState } from "react";
import { months } from "../../utils/static_lists";
import { getYear } from "date-fns";
import { format } from "date-fns";
import { validateSSN } from "../../utils/validate_inputs";

const ProtectedUserInfo = ({
    onChange,
    onUpdate,
    disabled,
    fullSSNRequired,
}) => {
    const startingValues = {
        day: {
            value: "",
            error: false,
        },
        month: {
            value: "",
            error: false,
        },
        year: {
            value: "",
            error: false,
        },
        ssn: {
            value: "",
            error: false,
        },
    };

    const [formValues, setFormValues] = useState(startingValues);

    const formDataValid = (formData) => {
        if (!formData.day.value) {
            formData.day.error = true;
            formData.day.errMsg = "Day required";
        } else if (parseInt(formData.day.value) > 31) {
            formData.day.error = true;
            formData.day.errMsg = "Day invalid";
        } else {
            formData.day.error = false;
            formData.day.errMsg = undefined;
        }

        if (!formData.month.value) {
            formData.month.error = true;
            formData.month.errMsg = "Month required";
        } else {
            formData.month.error = false;
            formData.month.errMsg = undefined;
        }

        if (!formData.year.value) {
            formData.year.error = true;
            formData.year.errMsg = "Year required";
        } else if (parseInt(formData.year.value) > getYear(new Date()) - 17) {
            formData.year.error = true;
            formData.year.errMsg =
                "You must be 18 or older to register on legends";
        } else if (parseInt(formData.year.value) > getYear(new Date()) - 17) {
            formData.year.error = true;
            formData.year.errMsg =
                "You must be 18 or older to register on legends";
        } else if (parseInt(formData.year.value) < getYear(new Date()) - 130) {
            formData.year.error = true;
            formData.year.errMsg = "Year invalid";
        } else {
            formData.year.error = false;
            formData.year.errMsg = undefined;
        }

        const errObj = validateSSN(formData.ssn.value, fullSSNRequired);

        formData.ssn.error = errObj.error;
        formData.ssn.errMsg = errObj.errMsg;

        setFormValues(formData);

        const error = Object.keys(formData)
            .map((key) => {
                return formData[key].error;
            })
            .some((el) => el);

        if (!error) {
            formData.dateOfBirth = {
                // Need to ignore time of day to ensure no strange time zone issues
                value: format(
                    new Date(
                        `${formData.month.value} ${formData.day.value}, ${formData.year.value}`
                    ),
                    "yyyy-MM-dd"
                ),
            };
        }
        onUpdate(formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedObject = { ...formValues };
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} md={12} lg={4}>
                    <Typography variant="subtitle3">
                        {"SSN " +
                            (fullSSNRequired
                                ? "(complete SSN required)"
                                : "(first four digits requried)")}
                    </Typography>
                    <TextField
                        error={!!formValues.ssn.error}
                        helperText={formValues.ssn.errMsg}
                        name="ssn"
                        label={
                            fullSSNRequired
                                ? "Complete SSN"
                                : "Last four digits"
                        }
                        variant="filled"
                        value={formValues.ssn.value}
                        onChange={handleInputChange}
                        fullWidth
                        type="password"
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={12} lg={8}>
                    <Typography variant="subtitle3">Birthday</Typography>

                    <Grid container spacing={2} sx={{ width: "100%" }}>
                        <Grid item xs={4} md={4}>
                            <TextField
                                error={!!formValues.day.error}
                                helperText={formValues.day.errMsg}
                                name="day"
                                label="Day"
                                variant="filled"
                                type="number"
                                value={formValues.day.value}
                                onChange={handleInputChange}
                                fullWidth
                            ></TextField>
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    name="month"
                                    value={formValues.month.value}
                                    onChange={handleInputChange}
                                >
                                    {months.map((month) => {
                                        return (
                                            <MenuItem key={month} value={month}>
                                                {month}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                error={!!formValues.year.error}
                                helperText={formValues.year.errMsg}
                                name="year"
                                label="Year"
                                variant="filled"
                                value={formValues.year.value}
                                onChange={handleInputChange}
                                fullWidth
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProtectedUserInfo;
