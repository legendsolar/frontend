import Divider from 'components/basics/divider';

const ComponentDivider = ({sx = {}}) => {
    return (
        <Divider
            sx={{
                sx,
                ml: -4,
                mr: -4,
            }}
        ></Divider>
    );
};

export default ComponentDivider;
