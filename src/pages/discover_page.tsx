import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import DiscoveryContent from 'content/discovery_content';
import assetData from 'static_data/assets';
import useNavBar from 'hooks/use_nav_bar';
import {useSolarFacilities} from 'airtable/use_solar_facilities';
import LoadingView from 'views/loading_view';

const DiscoverPage = () => {
    const navBarProps = useNavBar();

    const {loading, assets} = useSolarFacilities();

    console.log({loading, assets});

    if (loading) {
        return <LoadingView></LoadingView>;
    }

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <DiscoveryContent assets={assets}></DiscoveryContent>
        </DefaultView>
    );
};

export default DiscoverPage;
