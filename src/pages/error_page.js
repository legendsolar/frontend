import { Box } from "@mui/material";
import DefaultComponent from "../components/default_component";
import DefaultView from "../views/default_view";

const ErrorPage = ({}) => {
    return (
        <DefaultView>
            <DefaultComponent>
                <Box sx={{ height: "600px" }}>{":("}</Box>
            </DefaultComponent>
        </DefaultView>
    );
};

export default ErrorPage;
