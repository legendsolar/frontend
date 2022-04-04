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
import { format } from "date-fns";
import {
    validateMonth,
    validateDay,
    validateYear,
    validateSSN,
} from "../../validation/user_data_validation";

const ProtectedUserInfo = ({
    onChange,
    onUpdate,
    disabled,
    fullSSNRequired,
    completed,
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedObject = { ...formValues };

        switch (name) {
            case "day":
                updatedObject[name] = {
                    ...validateDay(value),
                };
                break;

            case "month":
                updatedObject[name] = {
                    ...validateMonth(value),
                };
                break;

            case "year":
                updatedObject[name] = {
                    ...validateYear(value),
                };
                break;

            case "ssn":
                updatedObject[name] = {
                    ...validateSSN(value),
                };
                break;
        }
        updatedObject[name].value = value;

        const error = Object.keys(updatedObject)
            .map((key) => {
                return updatedObject[key].error;
            })
            .some((el) => el);

        if (!error) {
            updatedObject.dateOfBirth = {
                // Need to ignore time of day to ensure no strange time zone issues
                value: format(
                    new Date(
                        `${updatedObject.month.value} ${updatedObject.day.value}, ${updatedObject.year.value}`
                    ),
                    "yyyy-MM-dd"
                ),
            };
        }

        setFormValues(updatedObject);
        onUpdate(updatedObject);
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} md={12} lg={4}>
                    <Typography variant="subtitle3">
                        {"SSN " +
                            (fullSSNRequired
                                ? "(complete SSN required)"
                                : "(last four digits required)")}
                    </Typography>
                    <TextField
                        data-private
                        error={!!formValues.ssn.error}
                        helperText={formValues.ssn.errMsg}
                        disabled={completed}
                        name="ssn"
                        label={
                            fullSSNRequired
                                ? "Complete SSN"
                                : "Last four digits"
                        }
                        variant="filled"
                        value={completed ? "•••••••••" : formValues.ssn.value}
                        onChange={handleInputChange}
                        fullWidth
                        type="password"
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={12} lg={8}>
                    <Typography variant="subtitle3">Birthday</Typography>

                    <Grid container spacing={2} sx={{ width: "100%" }}>
                        <Grid item xs={4} md={4}>
                            <FormControl
                                variant="filled"
                                fullWidth
                                disabled={completed}
                                data-private
                            >
                                <InputLabel>Month</InputLabel>
                                <Select
                                    name="month"
                                    value={
                                        completed
                                            ? "••••"
                                            : formValues.month.value
                                    }
                                    onChange={handleInputChange}
                                >
                                    {months.map((month) => {
                                        return (
                                            <MenuItem
                                                key={month}
                                                value={
                                                    completed ? "••••" : month
                                                }
                                            >
                                                {completed ? "••••" : month}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                data-private
                                error={!!formValues.day.error}
                                helperText={formValues.day.errMsg}
                                disabled={completed}
                                name="day"
                                label="Day"
                                variant="filled"
                                type={completed ? "string" : "number"}
                                value={completed ? "••" : formValues.day.value}
                                onChange={handleInputChange}
                                fullWidth
                            ></TextField>
                        </Grid>

                        <Grid item xs={4} md={4}>
                            <TextField
                                data-private
                                error={!!formValues.year.error}
                                helperText={formValues.year.errMsg}
                                disabled={completed}
                                name="year"
                                label="Year"
                                variant="filled"
                                value={
                                    completed ? "••••" : formValues.year.value
                                }
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
