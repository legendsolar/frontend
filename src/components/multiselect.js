import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

const MultiSelect = ({
    name,
    text,
    fields,
    selected,
    error,
    onChangeListener,
}) => {
    const handleChange = (event) => {
        onChangeListener(event);
    };

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>{text}</InputLabel>
            <Select
                helperText={text}
                name={name}
                value={selected?.value != null ? selected.value : ''}
                onChange={handleChange}
            >
                {fields.map((field) => {
                    return (
                        <MenuItem key={field.id} value={field.value}>
                            {field.text}
                        </MenuItem>
                    );
                })}
            </Select>
            {!!error ? (
                <FormHelperText error>{error.errMsg}</FormHelperText>
            ) : null
            }
        </FormControl>
    );
};

MultiSelect.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    error: PropTypes.shape({
        error: PropTypes.bool,
        errMsg: PropTypes.string,
    }),
    onChangeListener: PropTypes.func,
};

MultiSelect.defaultProps = {
    onChangeListener: () => {},
    error: undefined
};

export default MultiSelect;
