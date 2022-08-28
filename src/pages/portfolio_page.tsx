import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import PortfolioContent from 'content/portfolio_content';
import {Facility, GenerationDatum} from 'schema/schema_gen_types';
import {usePortfolio, usePortfolioReturnType} from 'hooks/use_portfolio';
import {dateDifferenceHumanReadable} from 'utils/date_formatter';
import useEmptyContent from 'hooks/use_empty_content';
import {differenceInDays} from 'date-fns';
import {useState} from 'react';

const PortfolioPage = ({
    loading,
    facilityData,
    generationData,
    lastUpdatedDate,
    transfers,
    documents,
}: usePortfolioReturnType) => {
    const navBarProps = useNavBar();

    const [now, setNow] = useState(new Date());

    const dataStale = lastUpdatedDate
        ? differenceInDays(now, lastUpdatedDate) > 2
        : true;

    const subtitle = !dataStale
        ? `Last updated ${dateDifferenceHumanReadable(
              new Date(),
              lastUpdatedDate as Date,
          )} ago`
        : 'Error loading data';

    return (
        <DefaultView
            navBar={<NavBar {...navBarProps}></NavBar>}
            backgroundColor={'white.main'}
        >
            <PortfolioContent
                loading={loading}
                title={facilityData?.name}
                subtitle={subtitle}
                address={`${facilityData?.address?.streetAddress} | ${facilityData?.address?.city},${facilityData?.address?.state}`}
                facility={facilityData}
                generation={generationData}
                documents={documents}
                transfers={transfers}
                dataStale={dataStale}
            ></PortfolioContent>
        </DefaultView>
    );
};

export default () => <PortfolioPage {...usePortfolio()} />;
