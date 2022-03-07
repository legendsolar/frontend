import React from "react";
import SideBarNavView from "../views/side_bar_view";
import QuickAccountSummary from "../components/quick_account_summary";
import ComponentGrid from "../layouts/component_grid";
import UserStatus from "../components/user_status";

import { Paper } from "@mui/material";
const PortfolioPage = () => {
    return (
        <SideBarNavView
            drawer={<QuickAccountSummary></QuickAccountSummary>}
            mainContent={
                <div>
                    <Paper variant="container" sx={{ mb: 2 }}>
                        <UserStatus></UserStatus>
                    </Paper>
                    {/* <ComponentGrid></ComponentGrid> */}
                </div>
            }
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
