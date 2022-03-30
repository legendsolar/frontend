import { Paper, List, ListItemButton, Typography } from "@mui/material/";
import scrollToEl from "../utils/scroll_to_el";
import SideBar from "./sidebar_component";
import Divider from "./basics/divider.js";

const ScrollToSidebar = ({
    header,
    contentTitles,
    refs,
    additionalButtons,
}) => {
    const getAdditionalButtons = () => {
        if (!additionalButtons) return null;
        return additionalButtons;
    };

    return (
        <SideBar>
            {header}

            <List>
                {contentTitles.map((text, index, list) => (
                    <div>
                        <ListItemButton
                            sx={{ ml: -4, mr: -4, height: "88px" }}
                            key={index}
                            onClick={() => {
                                scrollToEl(refs.current[index], -20);
                            }}
                        >
                            <Typography variant="subtitle1">{text}</Typography>
                        </ListItemButton>
                        {/* {index !== list.length - 1 && <Divider></Divider>} */}
                    </div>
                ))}
                {getAdditionalButtons()}
            </List>
        </SideBar>
    );
};

export default ScrollToSidebar;
