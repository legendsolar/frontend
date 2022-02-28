import React from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
// import ComponentGrid from "../layouts/component_grid";
import SideBarNavView from "../views/side_bar_view";
import QuickAccountSummary from "../components/quick_account_summary";
import ComponentGrid from "../layouts/component_grid";
import UserStatus from "../components/user_status";
// import ComponentView from "../views/component_view";

import { Paper } from "@mui/material";
function PortfolioPage(props) {
    return (
        <SideBarNavView
            drawer={<QuickAccountSummary></QuickAccountSummary>}
            mainContent={
                <div>
                    <Paper variant="container" sx={{ mb: 2 }}>
                        <UserStatus></UserStatus>
                    </Paper>
                    <ComponentGrid></ComponentGrid>
                </div>
            }
        ></SideBarNavView>
    );
}

PortfolioPage.propTypes = {};

export default PortfolioPage;
