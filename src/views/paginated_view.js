import { Typography, List, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import SideBarView from "./side_bar_view";
import SideBar from "../components/sidebar_component";
import { useReducer } from "react";
import DefaultComponent from "../components/default_component";
import PageinatedComponent from "../components/paginated_component";

const PageinatedView = ({ pageContent }) => {
    pageContent = [
        {
            title: "Title 1",
            content: <Typography>Content 1...</Typography>,
        },
        {
            title: "Title 2",
            content: <Typography>Content 2...</Typography>,
        },
        {
            title: "Title 3",
            content: <Typography>Content 3...</Typography>,
        },
    ];

    const initState = {
        pageIndexStack: [0],
    };

    const reducer = (state, action) => {
        const newPageIndexStack = [...state.pageIndexStack];
        switch (action.type) {
            case "CHANGE_PAGE":
                newPageIndexStack.push(action.pageIndex);

                return {
                    ...state,
                    pageIndexStack: newPageIndexStack,
                };
            case "BACK_PAGE":
                newPageIndexStack.pop();
                return {
                    ...state,
                    pageIndexStack: newPageIndexStack,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const titles = pageContent.map((content, index) => (
        <ListItemButton
            sx={{ ml: -4, mr: -4, height: "88px" }}
            key={index}
            onClick={() => {
                dispatch({
                    type: "CHANGE_PAGE",
                    pageIndex: index,
                });
            }}
        >
            <Typography variant="subtitle1">{content.title}</Typography>
        </ListItemButton>
    ));

    const pages = pageContent.map((content, index) => (
        <PageinatedComponent
            title={content.title}
            onBack={() => {
                dispatch({
                    type: "BACK_PAGE",
                });
            }}
            backDisabled={state.pageIndexStack.length <= 1}
        >
            {content.content}
        </PageinatedComponent>
    ));

    return (
        <SideBarView
            drawer={
                <SideBar>
                    <Typography>Simple Pageination Test</Typography>
                    <List>{titles}</List>
                </SideBar>
            }
            mainContent={
                pages[state.pageIndexStack[state.pageIndexStack.length - 1]]
            }
        ></SideBarView>
    );
};

export default PageinatedView;
