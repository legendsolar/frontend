import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography,
    FormHelperText,
} from "@mui/material";

const MultiSelect = ({ id, text, fields, value, error, onChangeListener }) => {
    const handleChange = (event) => {
        const value = event.target.value;

        onChangeListener({
            id: id,
            value: value,
        });
    };

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>{text}</InputLabel>
            <Select
                helperText={text}
                name={id}
                value={value}
                onChange={onChangeListener}
            >
                {fields.map((field) => {
                    return (
                        <MenuItem key={field} value={field}>
                            {field}
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

export default MultiSelect;
