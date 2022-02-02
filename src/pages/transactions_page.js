import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import NavBar from "../components/nav_bar";
import { Button } from "@mui/material";
import SideBarNavView from "../views/side_bar_nav_view";
import Footer from "../components/footer";

function TransactionView(props) {
    const theme = useTheme();
    console.log(theme);

    return (
        <div>
            <NavBar></NavBar>
            <SideBarNavView></SideBarNavView>
            <Footer></Footer>
        </div>
    );
}

export default TransactionView;
