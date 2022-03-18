import { Box } from "@mui/material";
import DefaultComponent from "../components/default_component";
import DefaultView from "../views/default_view";
import { useParams } from "react-router-dom";

const NotFoundPage = ({}) => {
    console.log("not found");

    return (
        <DefaultView>
            <DefaultComponent>
                <Box sx={{ height: "600px" }}>{"This page does not exist"}</Box>
            </DefaultComponent>
        </DefaultView>
    );
};

export default NotFoundPage;
