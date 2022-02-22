import React from "react";
import { Checkbox, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
function CheckboxList({ options, singleOption }) {
    return (
        <Stack spacing={2}>
            {options.map((option) => {
                return (
                    <Stack
                        spacing={0}
                        sx={{ borderRadius: "10px", backgroundColor: "#eee" }}
                    >
                        <Typography
                            sx={{ ml: "50px", mt: 1, mb: 0 }}
                            variant="smallLabel"
                        >
                            {option.title.toUpperCase()}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Checkbox></Checkbox>
                            <Typography variant="subtitle3">
                                {option.description}
                            </Typography>
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
}

CheckboxList.propTypes = {
    options: PropTypes.array,
    singleOption: PropTypes.bool,
};

CheckboxList.defaultProps = {
    singleOption: true,
};

export default CheckboxList;
