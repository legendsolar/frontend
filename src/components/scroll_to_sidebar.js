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
                        key={text}
                        onClick={() =>
                            window.scrollTo(
                                0,
                                refs.current[index].offsetTop - 20
                            )
                        }
                    >
                        <Typography>{text}</Typography>
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default ScrollToSidebar;
