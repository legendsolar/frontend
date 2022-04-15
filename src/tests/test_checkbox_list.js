import {onIdTokenChanged} from 'firebase/auth';
import CheckboxList from 'components/inputs/checkbox_list';

const options = [
    {
        title: 'title 1',
        description: 'title 1 descrip',
    },

    {
        title: 'title 2',
        description: 'title 2 descrip',
    },
    {
        title: 'exclusive 1',
        description: 'cannot be selected with others',
        exclusive: true,
    },
];

const TestCheckboxList = () => {
    return (
        <CheckboxList
            options={options}
            precheckedList={[]}
            onInputChange={() => {}}
            disabled={false}
        ></CheckboxList>
    );
};

export default TestCheckboxList;
