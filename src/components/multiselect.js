import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography,
} from "@mui/material";

const MultiSelect = ({ id, text, fields, value, onChangeListener }) => {
    const handleChange = (event) => {
        const value = event.target.value;

        onChangeListener({
            id: id,
            value: value,
        });
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {text}
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value ? value : ""}
                    displayEmpty
                    onChange={handleChange}
                >
                    {fields.map((field) => {
                        console.log(field);
                        return (
                            <MenuItem value={field.id} key={field.id}>
                                {field.text}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default MultiSelect;
