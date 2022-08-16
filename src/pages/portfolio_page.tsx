import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import PortfolioContent from 'content/portfolio_content';
import {Facility, GenerationDatum} from 'schema/schema_gen_types';
import {generateFakeProductionData} from 'utils/fake_data';

const PortfolioPage = () => {
    const navBarProps = useNavBar();

    const facilityData: Facility = {
        name: 'Barnyard Solar',
        id: 'qqWHzumNkaVmZEvGfZRnq3',
        address: {
            city: 'Port Jervis',
            postalCode: '11111',
            state: 'NY',
            streetAddress: '285 Fulton St',
        },
        created: '2022-05-21T16:51:26',
        summary: {
            day_kWh: 1,
            monthToDate_kWh: 10,
            pastMonthGeneration_kWh: 10,
            pastWeek_kWh: 5,
            pastYearGeneration_kWh: 1000,
            performance_ratio: 1,
            totalGeneration_kWh: 10000,
            twentyFourHourGeneration_kWh: 1,
            uptime_percentage: 0.95,
            yearToDate_kWh: 1000,
        },
        economics: {},
        generationMetaData: {
            co2_per_kWh: 0.85,
            dollar_per_kWh: 0.15,
            max_kW: 5000,
        },
    };

    const generation: Array<GenerationDatum> = generateFakeProductionData(
        7,
        5000,
    );

    return (
        <DefaultView
            navBar={<NavBar {...navBarProps}></NavBar>}
            backgroundColor={'white.main'}
        >
            <PortfolioContent
                title={facilityData.name}
                subtitle={'Last updated 15 minutes ago'}
                address={`${facilityData.address.streetAddress} | ${facilityData.address.city},${facilityData.address.state}`}
                facilitySummary={facilityData.summary}
                facilityEconomics={facilityData.economics}
                generationMetaData={facilityData.generationMetaData}
                generation={generation}
            ></PortfolioContent>
        </DefaultView>
    );
};

export default PortfolioPage;
