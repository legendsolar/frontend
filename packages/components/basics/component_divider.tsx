import Divider from './divider';

export const ComponentDivider = ({sx = {}}) => {
    return (
        <Divider
            sx={{
                ...sx,
                ml: -4,
                mr: -4,
            }}
        ></Divider>
    );
};
