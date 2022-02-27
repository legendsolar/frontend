import { Paper, Typography, Stack } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import DefaultView from "../views/default_view";

const DocumentPage = () => {
    return (
        <DefaultView>
            <Paper variant="container">
                <Typography variant="smallHeadline">Documents</Typography>
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "500px" }}
                >
                    <ConstructionIcon sx={{ fontSize: 40 }}></ConstructionIcon>
                    <Typography variant="body2">
                        ...this page is under construction...
                    </Typography>
                </Stack>
            </Paper>
        </DefaultView>
    );
};

export default DocumentPage;
