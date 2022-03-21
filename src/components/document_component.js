import { Stack, List, ListItemButton, Typography } from "@mui/material/";
import DownloadIcon from "@mui/icons-material/Download";
import { DocumentIcon } from "./icons/document_icon";

const DocumentComponent = ({ documents }) => {
    return (
        <List>
            {documents.map((documentItem, index) => (
                <ListItemButton
                    sx={{ ml: -4, mr: -4, height: "62px" }}
                    key={index}
                    onClick={() => {}}
                >
                    <Stack
                        sx={{
                            width: "100%",
                        }}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography variant="subtitle1">
                            {documentItem.title}
                        </Typography>

                        <DownloadIcon></DownloadIcon>
                    </Stack>
                </ListItemButton>
            ))}
        </List>
    );
};

export default DocumentComponent;
