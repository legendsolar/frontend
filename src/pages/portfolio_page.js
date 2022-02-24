import React from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../Firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import ComponentGrid from "../layouts/component_grid";
import SideBarNavView from "../views/side_bar_view";
import QuickAccountSummary from "../components/quick_account_summary";

function PortfolioPage(props) {
    return (
        <SideBarNavView
            drawer={<QuickAccountSummary></QuickAccountSummary>}
            mainContent={<ComponentGrid></ComponentGrid>}
        ></SideBarNavView>
    );
}

PortfolioPage.propTypes = {};

export default PortfolioPage;
