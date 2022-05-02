import PortfolioPlaceholder from 'components/placeholders/portfolio_placeholder';
import AccountSummarySidebar from 'components/user/account_summary_sidebar';
import ComponentGrid from 'layouts/component_grid';
import React from 'react';
import SideBarNavView from 'views/side_bar_view';
const PortfolioPage = () => {
    return (
        <SideBarNavView
            drawer={<AccountSummarySidebar></AccountSummarySidebar>}
            mainContent={
                <div>
                    <ComponentGrid></ComponentGrid>
                </div>
            }
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
