import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    FormHelperText,
} from '@mui/material';

interface MultiSelectProps {
    name: string;
    text: string;
    fields: Array<{
        value: string;
        text: string;
    }>;
    selected: {
        value: string;
    };
    error?: string;
    disabled?: boolean;
    onChangeListener({name, value}: {name: string; value: string}): void;
}

const MultiSelect = ({
    name,
    text,
    fields,
    selected,
    error = undefined,
    disabled = false,
    onChangeListener,
}: MultiSelectProps) => {
    const handleChange = (event) => {
        const {name, value} = event.target;
        onChangeListener({name, value});
    };

    return (
        <FormControl variant="filled" fullWidth disabled={disabled}>
            <InputLabel>{text}</InputLabel>
            <Select
                // helperText={text}
                name={name}
                value={selected?.value != null ? selected.value : ''}
                onChange={handleChange}
            >
                {fields.map((field) => {
                    return (
                        <MenuItem key={field.value} value={field.value}>
                            {field.text}
                        </MenuItem>
                    );
                })}
            </Select>
            {!!error ? <FormHelperText error>{error}</FormHelperText> : null}
        </FormControl>
    );
};

export default MultiSelect;
