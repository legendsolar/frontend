import { useEffect, useState } from "react";
import { Checkbox, Divider, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
function CheckboxList({ options, onInputChange }) {
    const [checkedList, setCheckedList] = useState(
        Object.fromEntries(
            Object.entries(options).map(([key, option]) => [
                key,
                option.checked ? option.checked : false,
            ])
        )
    );
    const [exclusive, setExclusive] = useState(undefined);

    const setCheckedItem = (key, value) => {
        if (checkedList[key] != value) {
            setExclusive(undefined);

            const list = { ...checkedList };
            if (options[key].exclusive && value) {
                Object.keys(list).forEach((key) => {
                    list[key] = false;
                });
                setExclusive(key);
            }

            list[key] = value;
            setCheckedList(list);

            onInputChange(list);
        }
    };

    return (
        <Stack spacing={2}>
            {Object.entries(options).map(([key, option]) => {
                return (
                    <Stack spacing={0} key={key}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ mb: 1 }}
                        >
                            <Checkbox
                                checked={checkedList[key]}
                                disabled={exclusive ? exclusive != key : false}
                                onChange={(event) => {
                                    setCheckedItem(key, event.target.checked);
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
    options: PropTypes.object,
    singleOption: PropTypes.bool,
};

CheckboxList.defaultProps = {
    singleOption: true,
};

export default CheckboxList;
