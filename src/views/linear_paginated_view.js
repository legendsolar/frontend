import {Typography, List, ListItemButton} from '@mui/material';
import PropTypes from 'prop-types';
import SideBarView from 'views/side_bar_view';
import SideBar from 'components/utils/sidebar_component';
import {useReducer} from 'react';
import Component from 'components/basics/component';
import PageinatedComponent from 'components/utils/paginated_component';

const LinearPageinatedView = ({pageContent, header, pageIndex}) => {
    console.log(pageIndex);
    const titles = pageContent.map((content, index) => {
        if (content.sidebar !== false) {
            return (
                <ListItemButton
                    sx={{ml: -4, mr: -4, height: '88px'}}
                    key={index}
                    selected={index == pageIndex}
                    onClick={() => {}}
                    disabled={content.disabled}
                >
                    <Typography variant="subtitle1" sx={{ml: 1}}>
                        {content.title}
                    </Typography>
                </ListItemButton>
            );
        }

        return null;
    });

    const pages = pageContent.map((content, index) => (
        <PageinatedComponent
            title={content.title}
            onBack={() => {
                dispatch({
                    type: 'BACK_PAGE',
                });
            }}
            backDisabled={index <= 0 || pageContent[index - 1].disabled}
        >
            {content.content}
        </PageinatedComponent>
    ));

    return (
        <SideBarView
            drawer={
                <SideBar>
                    {header}
                    <List>{titles}</List>
                </SideBar>
            }
            mainContent={pages[pageIndex]}
        ></SideBarView>
    );
};

export default LinearPageinatedView;
