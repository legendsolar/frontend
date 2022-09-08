import MultiSelect from '../multiselect';
import {useState} from 'react';

const TestMultiselect = () => {
    const fields = [
        {
            id: 1,
            value: 'option1',
            text: 'option 1',
        },
        {
            id: 2,
            value: 'option2',
            text: 'option 2',
        },
        {
            id: 3,
            value: 'option3',
            text: 'option 3',
        },
    ];

    const [selected, setSelected] = useState<{value: string}>({value: ''});

    const onChangeListener = ({name, value}) => {
        console.log({onChangeListener: {name, value}});
        setSelected({value});
    };

    return (
        <MultiSelect
            name="testMultiselect"
            text="Test Multiselect Text"
            fields={fields}
            selected={selected}
            onChangeListener={onChangeListener}
        ></MultiSelect>
    );
};

export default TestMultiselect;
