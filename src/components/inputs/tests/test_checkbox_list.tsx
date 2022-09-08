import CheckboxList from '../checkbox_list';

const TestCheckboxList = () => {
    return (
        <CheckboxList
            items={[
                {
                    key: 'key1',
                    title: 'title 1',
                    description: 'description 1',
                },
                {
                    key: 'key2',
                    title: 'title 2',
                    description: 'description 2',
                },

                {
                    key: 'key3',
                    title: 'title 3',
                    description: 'exlusive 3',
                    exclusive: true,
                },
            ]}
            onInputChange={(items) => {
                console.log({items});
            }}
            disabled={false}
        ></CheckboxList>
    );
};

export default TestCheckboxList;
