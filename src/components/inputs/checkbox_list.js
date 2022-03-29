import { useEffect, useState } from "react";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import Divider from "../basics/divider";
import PropTypes from "prop-types";
function CheckboxList({ options, precheckedList, onInputChange }) {
    const [checkedList, setCheckedList] = useState(
        Object.fromEntries(
            Object.entries(options).map(([key, option]) => [key, false])
        )
    );

    useEffect(() => {
        if (precheckedList) {
            setCheckedList(precheckedList);
        }
    }, [precheckedList]);

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
                    <Box
                        sx={{
                            height: "88px",
                        }}
                        key={key}
                    >
                        <Stack
                            direction="row"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <Checkbox
                                sx={{
                                    fontSize: "22px",
                                    mt: "auto",
                                    mb: "auto",
                                }}
                                checked={checkedList[key]}
                                disabled={exclusive ? exclusive != key : false}
                                onChange={(event) => {
                                    setCheckedItem(key, event.target.checked);
                                }}
                            ></Checkbox>
                            <Stack spacing={0}>
                                <Typography
                                    sx={{ mt: 1, mb: 1 }}
                                    variant="subtitle1"
                                >
                                    {option.title}
                                </Typography>

                                <Typography variant="description">
                                    {option.description}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
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
