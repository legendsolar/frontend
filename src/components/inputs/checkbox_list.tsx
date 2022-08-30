import {useEffect, useState} from 'react';
import {Box, Checkbox, Stack, Typography} from '@mui/material';
import Divider from 'components/basics/divider';
import CheckboxItem, {
    CheckboxItemInterface,
} from 'components/inputs/checkbox_item';

export interface CheckboxListItem extends CheckboxItemInterface {
    exclusive?: boolean;
    key: string;
}

interface CheckboxListProps<T extends CheckboxListItem> {
    items: Array<T>;
    onInputChange(items: Array<T>): any;
    disabled: boolean;
}

const CheckboxList = <T extends CheckboxListItem>({
    items,
    onInputChange,
    disabled,
}: CheckboxListProps<T>) => {
    const [checkedList, setCheckedList] = useState<Array<T>>(
        items.map((item) => ({
            ...item,
            checked: item?.checked ? true : false,
            disabled: item?.disabled ? true : false,
        })),
    );
    const [exclusive, setExclusive] = useState('');

    const setCheckedItem = (item: CheckboxListItem) => {
        const list = [...checkedList];

        if (!item.checked) {
            // item was not checked
            if (item.exclusive) {
                list.map((i) => {
                    i.checked = false;
                    i.disabled = true;
                });
                setExclusive(item.key);
            }

            item.disabled = false;
            item.checked = true;
        } else {
            if (item.exclusive) {
                setExclusive('');
                list.map((i) => {
                    i.disabled = false;
                });
            }

            item.checked = false;
        }

        setCheckedList(list);
        onInputChange(list);
    };

    return (
        <Stack spacing={2}>
            {checkedList.map((item, index, list) => {
                const key = index;
                return (
                    <div style={{margin: '0px'}} key={key}>
                        <CheckboxItem
                            {...{
                                ...item,
                                key,
                                onClick: () => {
                                    setCheckedItem(item);
                                },
                                sx: {
                                    ml: -4,
                                    mr: -4,
                                    pr: 4,
                                    pl: 4,
                                    '&:hover': {
                                        backgroundColor: 'white.main',
                                    },
                                    height: '88px',
                                },
                            }}
                        ></CheckboxItem>
                        {/* {index !== list.length - 1 && <Divider></Divider>} */}
                    </div>
                );
            })}
        </Stack>
    );
};

export default CheckboxList;
