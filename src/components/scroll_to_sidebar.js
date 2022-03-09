import {
    Divider,
    Paper,
    List,
    ListItemButton,
    Typography,
} from "@mui/material/";

const ScrollToSidebar = ({ header, contentTitles, refs }) => {
    return (
        <Paper variant="container" sx={{ width: "100%", m: 0 }}>
            {header}

            <List>
                {contentTitles.map((text, index) => (
                    <ListItemButton
                        sx={{ ml: -2, mr: -2, height: "88px" }}
                        key={text}
                        onClick={() =>
                            window.scrollTo(
                                0,
                                refs.current[index].offsetTop - 20
                            )
                        }
                    >
                        <Typography variant="subtitle1">{text}</Typography>
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default ScrollToSidebar;
