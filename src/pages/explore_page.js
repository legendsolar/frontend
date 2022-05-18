import {useRef} from 'react';
import {Typography, Paper, Box, Stack, Button, Grid} from '@mui/material';
import SideBarNavView from 'views/side_bar_view';
import OfferingComponent from 'components/invest/offering';
import MetricList from 'components/summary/metric_list';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import DefaultComponent from 'components/utils/default_component';
import {InvestmentAccountSubtype} from 'plaid';
import {useTheme} from '@mui/material';
import PanelsSvg from 'components/icons/panels_svg';
import {useNavigate} from 'react-router-dom';
import investmentOpportunities from 'utils/asset_data';
import OfferingListComponent from 'components/invest/offering_list_component';

const ExplorePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const contentRefs = useRef([]);
    const drawerTitles = [
        'Santa Rosa Solar',
        'Glassboro Solar',
        'Lake Elsinore Solar',
        'Lindenwold Solar',
    ];

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Typography variant="smallHeadline">
                            Available Solar Facilities
                        </Typography>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <OfferingListComponent
                    offerings={investmentOpportunities}
                    refs={contentRefs}
                ></OfferingListComponent>
            }
        ></SideBarNavView>
    );
};

ExplorePage.propTypes = {};

export default ExplorePage;
