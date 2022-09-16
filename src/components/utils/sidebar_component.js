import Component from 'components/basics/component';

const SideBar = ({children, sx = {}}) => {
    return (
        <Component shadow sx={{width: '100%', mt: 4, ...sx}}>
            {children}
        </Component>
    );
};

export default SideBar;
