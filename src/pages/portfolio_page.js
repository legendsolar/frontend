import React from 'react';
import SideBarNavView from 'views/side_bar_view';
// import ComponentGrid from 'layouts/component_grid';
const PortfolioPage = () => {
    return (
        <SideBarNavView
            drawer={<div></div>}
            mainContent={<div></div>}
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
