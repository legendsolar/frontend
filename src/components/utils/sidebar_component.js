import Component from 'components/basics/component';

const SideBar = ({children}) => {
    return (
        <Component standardWidth={false} shadow sx={{width: '100%', m: 0}}>
            {children}
        </Component>
    );
};

export default SideBar;
