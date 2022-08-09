import {useEffect, useState} from 'react';
import {Box, Checkbox, Stack, Typography} from '@mui/material';
import Divider from 'components/basics/divider';

export interface CheckboxItem {
    title: string;
    description: string;
    key: string;
    checked?: boolean;
    exclusive?: boolean;
}

interface CheckboxListProps {
    items: Array<CheckboxItem>;
    onInputChange(items: Array<CheckboxItem>): any;
    disabled: boolean;
}

const CheckboxList = ({items, onInputChange, disabled}: CheckboxListProps) => {
    const [checkedList, setCheckedList] = useState(
        items.map((item) => ({
            ...item,
            checked: item.checked ? true : false,
            exclusive: item.exclusive ? true : false,
        })),
    );
    const [exclusive, setExclusive] = useState('');

    const setCheckedItem = (item: CheckboxItem) => {
        const list = [...checkedList];

        if (!item.checked) {
            if (item.exclusive) {
                list.map((item) => {
                    item.checked = false;
                });
                setExclusive(item.key);
            }

            item.checked = true;
        } else {
            if (item.exclusive) {
                setExclusive('');
            }

            item.checked = false;
        }

        setCheckedList(list);
        onInputChange(list);
    };

    return (
        <Stack spacing={2}>
            {checkedList.map((item, index, list) => {
                return (
                    <div style={{margin: '0px'}} key={index}>
                        <Box
                            sx={{
                                height: '88px',
                                display: 'flex',
                                ml: -4,
                                mr: -4,
                                pr: 4,
                                pl: 4,
                                '&:hover': {
                                    backgroundColor: 'white.main',
                                },
                            }}
                            alignItems="center"
                            key={item.key}
                            onClick={(event) => {
                                if (
                                    !disabled &&
                                    !(exclusive ? exclusive != item.key : false)
                                ) {
                                    setCheckedItem(item);
                                }
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Checkbox
                                    sx={{
                                        fontSize: '22px',
                                        mt: 'auto',
                                        mb: 'auto',
                                    }}
                                    checked={item.checked}
                                    disabled={
                                        exclusive
                                            ? exclusive != item.key
                                            : false || disabled
                                    }
                                ></Checkbox>
                                <Stack spacing={0}>
                                    <Typography
                                        sx={{mt: 1, mb: 1}}
                                        variant={'smallLabel' as any}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography variant={'description' as any}>
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        {/* {index !== list.length - 1 && <Divider></Divider>} */}
                    </div>
                );
            })}
        </Stack>
    );
};

export default CheckboxList;
