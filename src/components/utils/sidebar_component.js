import Component from 'components/basics/component';

const SideBar = ({children, sx = {}}) => {
    return (
        <Component standardWidth={false} shadow sx={{...sx, mt: 4}}>
            {children}
        </Component>
    );
};

export default SideBar;
