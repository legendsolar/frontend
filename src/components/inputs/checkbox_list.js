import { useState } from "react";
import { Checkbox, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
function CheckboxList({ options, onInputChange }) {
    const [checkedList, setCheckedList] = useState([]);
    const [exclusive, setExclusive] = useState(-1);

    options.map((option) => {
        checkedList.push("default" in option ? option.default : false);
    });

    const setCheckedItem = (i, value) => {
        if (checkedList[i] != value) {
            setExclusive(-1);

            const list = checkedList.slice();
            if (options[i].exclusive && value) {
                list.fill(false);
                setExclusive(i);
            }

            list[i] = value;
            setCheckedList(list);

            onInputChange(list);
        }
    };

    return (
        <Stack spacing={2}>
            {options.map((option, i) => {
                return (
                    <Stack spacing={0}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ mb: 1 }}
                        >
                            <Checkbox
                                checked={checkedList[i]}
                                disabled={exclusive > 0 && exclusive != i}
                                onChange={(event) => {
                                    setCheckedItem(i, event.target.checked);
                                }}
                            ></Checkbox>
                            <Typography
                                sx={{ mt: 1, mb: 1 }}
                                variant="smallHeadline"
                            >
                                {option.title}
                            </Typography>
                        </Stack>
                        <Typography variant="body2">
                            {option.description}
                        </Typography>
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
