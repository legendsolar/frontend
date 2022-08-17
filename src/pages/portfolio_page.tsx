import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import PortfolioContent from 'content/portfolio_content';
import {Facility, GenerationDatum} from 'schema/schema_gen_types';
import {usePortfolio, usePortfolioReturnType} from 'hooks/use_portfolio';

const PortfolioPage = ({
    loading,
    facilityData,
    generationData,
}: usePortfolioReturnType) => {
    const navBarProps = useNavBar();

    return (
        <DefaultView
            navBar={<NavBar {...navBarProps}></NavBar>}
            backgroundColor={'white.main'}
        >
            <PortfolioContent
                loading={loading}
                title={facilityData.name}
                subtitle={'Last updated 15 minutes ago'}
                address={`${facilityData.address.streetAddress} | ${facilityData.address.city},${facilityData.address.state}`}
                facility={facilityData}
                facilitySummary={facilityData.summary}
                facilityEconomics={facilityData.economics}
                generationMetaData={facilityData.generationMetaData}
                generation={generationData}
                location={facilityData.location}
            ></PortfolioContent>
        </DefaultView>
    );
};

export default () => <PortfolioPage {...usePortfolio()} />;
