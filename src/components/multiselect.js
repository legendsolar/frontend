import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography,
    FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const MultiSelect = ({
    name,
    text,
    fields,
    value,
    error,
    onChangeListener,
}) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleChange = (event) => {
        const value = event.target.value;

        setSelectedValue(value);

        onChangeListener({
            value: value,
            name: name,
        });
    };

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>{text}</InputLabel>
            <Select
                helperText={text}
                name={name}
                value={selectedValue}
                onChange={handleChange}
            >
                {fields.map((field) => {
                    return (
                        <MenuItem key={field.id} value={field.id}>
                            {field.text}
                        </MenuItem>
                    );
                })}
            </Select>
            {!!error ? (
                <FormHelperText error>{error.errMsg}</FormHelperText>
            ) : (
                <></>
            )}
        </FormControl>
    );
};

MultiSelect.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    fields: PropTypes.array,
    value: PropTypes.string,
    error: PropTypes.shape({
        error: PropTypes.bool,
        errMsg: PropTypes.string,
    }),
    onChangeListener: PropTypes.func,
};

MultiSelect.defaultProps = {
    onChangeListener: () => {},
};

export default MultiSelect;
