import React from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../Firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import ComponentGrid from "../components/component_grid";
import SideBarNavView from "../views/side_bar_view";
import QuickAccountSummary from "../components/quick_account_summary";

function PortfolioPage(props) {
    const auth = useAuth();
    const user = auth.user;

    const [snapshots, loading, error] = useList(ref(database, "users"));

    if (!user) {
        console.log("Error, not signed in, auth state:");
        console.log(auth);
        return <div>Error, You're Not Signed In</div>;
    }

    const drawerWidth = 300;

    return (
        <SideBarNavView
            drawerWidth={drawerWidth}
            drawer={<QuickAccountSummary></QuickAccountSummary>}
            mainContent={<ComponentGrid></ComponentGrid>}
        ></SideBarNavView>
    );
}

PortfolioPage.propTypes = {};

export default PortfolioPage;
