import PortfolioPlaceholder from 'components/placeholders/portfolio_placeholder';
import AccountSummarySidebar from 'components/user/account_summary_sidebar';
import {useUser} from 'hooks/use_user';
import useFacilities from 'hooks/use_facilities';
import ComponentGrid from 'layouts/component_grid';
import React, {useEffect, useState} from 'react';
import LoadingView from 'views/loading_view';
import SideBarNavView from 'views/side_bar_view';
import Worm from 'components/worm/worm';
import subDays from 'date-fns/subDays';
import DefaultComponent from 'components/utils/default_component';

const PortfolioPage = () => {
    const {useGetUserFacilities} = useUser();
    const {useGetFacilityDataByDate} = useFacilities();

    const [loadDate, setLoadTime] = useState(new Date());

    // const {facilities, loading, error} = useGetUserFacilities();

    console.log(loadDate);

    const {
        data,
        loading: dataLoading,
        error: dataError,
    } = useGetFacilityDataByDate({
        facilityId: 'umUfn1aQ6JYFJktF6wSMk',
        startDate: subDays(loadDate, 4),
        endDate: loadDate,
    });

    // const userHasFacilities = !!facilities;

    const userHasFacilities = true;

    if (dataLoading) {
        return <LoadingView></LoadingView>;
    }

    const mostRecentDatum = data[data.length - 1];

    console.log({data});

    if (!userHasFacilities) {
        return (
            <SideBarNavView
                drawer={<AccountSummarySidebar></AccountSummarySidebar>}
                mainContent={<PortfolioPage></PortfolioPage>}
            ></SideBarNavView>
        );
    }

    return (
        <SideBarNavView
            drawer={
                <AccountSummarySidebar
                    panelCount={'10'}
                    costPerPanel={'750'}
                    totalInvestment={'7500'}
                    kwTotal={'10'}
                ></AccountSummarySidebar>
            }
            mainContent={
                <DefaultComponent sx={{m: 0, p: 0}}>
                    <Worm
                        rawData={data}
                        loading={dataLoading}
                        error={dataError}
                    ></Worm>
                </DefaultComponent>
            }
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
