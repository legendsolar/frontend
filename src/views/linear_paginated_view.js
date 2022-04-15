import {Typography, List, ListItemButton} from '@mui/material';
import PropTypes from 'prop-types';
import SideBarView from 'views/side_bar_view';
import SideBar from 'components/utils/sidebar_component';
import {useReducer} from 'react';
import DefaultComponent from 'components/utils/default_component';
import PageinatedComponent from 'components/utils/paginated_component';

const LinearPageinatedView = ({pageContent, header, pageIndex}) => {
    const initState = {
        pageIndex: pageIndex,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_PAGE':
                return {
                    ...state,
                    pageIndex: action.pageIndex,
                };
            case 'BACK_PAGE':
                // Todo this logic breaks my functional paradigm
                var newIndex = state.pageIndex <= 0 ? 0 : state.pageIndex - 1;

                while (pageContent[newIndex].disabled && newIndex > 0) {
                    newIndex = newIndex - 1;
                }

                return {
                    ...state,
                    pageIndex: newIndex,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const titles = pageContent.map((content, index) => {
        console.log(content.disabled);
        if (content.sidebar !== false) {
            return (
                <ListItemButton
                    sx={{ml: -4, mr: -4, height: '88px'}}
                    key={index}
                    selected={index == state.pageIndex}
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_PAGE',
                            pageIndex: index,
                        });
                    }}
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
            mainContent={pages[state.pageIndex]}
        ></SideBarView>
    );
};

export default LinearPageinatedView;
