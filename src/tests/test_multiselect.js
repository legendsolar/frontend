import MultiSelect from 'components/utils/multiselect';
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

    const [selected, setSelected] = useState(null);

    const onChangeListener = (event) => {
        setSelected(event.target);
    };

    return (
        <MultiSelect
            name="testMultiselect"
            text="Test Multiselect Text"
            fields={fields}
            selected={selected}
            error={null}
            onChangeListener={onChangeListener}
        ></MultiSelect>
    );
};

export default TestMultiselect;
