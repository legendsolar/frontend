import {Component} from '../basics/component';

export const SideBar = ({children, sx = {}}) => {
    return (
        <Component shadow sx={{width: '100%', mt: 4, ...sx}}>
            {children}
        </Component>
    );
};
