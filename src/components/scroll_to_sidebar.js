import {
    Divider,
    Paper,
    List,
    ListItemButton,
    Typography,
} from "@mui/material/";
import scrollToEl from "../utils/scroll_to_el";

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
        <Paper variant="container" sx={{ width: "100%", m: 0 }}>
            {header}

            <List>
                {contentTitles.map((text, index) => (
                    <ListItemButton
                        sx={{ ml: -4, mr: -4, height: "88px" }}
                        key={index}
                        onClick={() => {
                            scrollToEl(refs.current[index], -20);
                        }}
                    >
                        <Typography variant="subtitle1">{text}</Typography>
                    </ListItemButton>
                ))}
                {getAdditionalButtons()}
            </List>
        </Paper>
    );
};

export default ScrollToSidebar;
