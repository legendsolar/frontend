import React from 'react';
import SideBarNavView from 'views/side_bar_view';
import QuickAccountSummary from 'components/user/quick_account_summary';
// import ComponentGrid from 'layouts/component_grid';
const PortfolioPage = () => {
    return (
        <SideBarNavView
            drawer={<QuickAccountSummary></QuickAccountSummary>}
            mainContent={<div></div>}
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
