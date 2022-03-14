import { Typography, List, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import SideBarView from "./side_bar_view";
import SideBar from "../components/sidebar_component";
import { useReducer } from "react";
import DefaultComponent from "../components/default_component";
import PageinatedComponent from "../components/paginated_component";

const LinearPageinatedView = ({ pageContent, header, pageIndex }) => {
    const initState = {
        pageIndex: pageIndex,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_PAGE":
                return {
                    ...state,
                    pageIndex: action.pageIndex,
                };
            case "BACK_PAGE":
                const newIndex = state.pageIndex <= 0 ? 0 : state.pageIndex - 1;
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
        if (content.sidebar !== false) {
            return (
                <ListItemButton
                    sx={{ ml: -4, mr: -4, height: "88px" }}
                    key={index}
                    onClick={() => {
                        dispatch({
                            type: "CHANGE_PAGE",
                            pageIndex: index,
                        });
                    }}
                    disabled={content.disabled}
                >
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
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
                    type: "BACK_PAGE",
                });
            }}
            backDisabled={state.pageIndex <= 0}
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
