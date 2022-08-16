import Component from 'components/basics/component';

const SideBar = ({children, sx = {}}) => {
    return (
        <Component shadow sx={{...sx, mt: 4}}>
            {children}
        </Component>
    );
};

export default SideBar;
