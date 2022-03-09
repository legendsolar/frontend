import {
    Divider,
    Paper,
    List,
    ListItemButton,
    Typography,
} from "@mui/material/";
import scrollToEl from "../utils/scroll_to_el";

const ScrollToSidebar = ({ header, contentTitles, refs }) => {
    return (
        <Paper variant="container" sx={{ width: "100%", m: 0 }}>
            {header}

            <List>
                {contentTitles.map((text, index) => (
                    <ListItemButton
                        sx={{ ml: -4, mr: -4, height: "88px" }}
                        key={text}
                        onClick={() => {
                            scrollToEl(refs.current[index], -20);
                        }}
                    >
                        <Typography variant="subtitle1">{text}</Typography>
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default ScrollToSidebar;
