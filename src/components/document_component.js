import { Stack, List, ListItemButton, Typography } from "@mui/material/";
import DownloadIcon from "@mui/icons-material/Download";
import { DocumentIcon } from "./icons/document_icon";
import { useStorage } from "reactfire";
import { ref, getDownloadURL } from "firebase/storage";

const DocumentComponent = ({ documents }) => {
    const storage = useStorage();
    const documentRef = ref(
        storage,
        "gs://legends-alpha.appspot.com/TestDoc.pdf"
    );

    const downloadDocument = () => {
        getDownloadURL(documentRef).then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);

            var link = document.createElement("a");
            if (link.download !== undefined) {
                link.setAttribute("href", url);
                link.setAttribute("target", "_blank");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return (
        <List>
            {documents.map((documentItem, index) => (
                <ListItemButton
                    sx={{ ml: -4, mr: -4, height: "62px" }}
                    key={index}
                    onClick={() => {
                        downloadDocument();
                    }}
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
