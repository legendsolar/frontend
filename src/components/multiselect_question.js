import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography,
} from "@mui/material";
import { useState } from "react";

const MultiSelectQuestion = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("none");

    const handleChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Question 1
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedAnswer}
                    displayEmpty
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Answer 1</MenuItem>
                    <MenuItem value={10}>Answer 2</MenuItem>
                    <MenuItem value={10}>Answer 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default MultiSelectQuestion;
