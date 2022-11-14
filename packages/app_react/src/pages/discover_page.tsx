import DefaultView from 'views/default_view';
import {NavBar} from '@project/components/utils/nav_bar';
import DiscoveryContent from 'content/discovery_content';
import assetData from 'static/assets';
import useNavBar from '@project/hooks/use_nav_bar';
import {useSolarFacilities} from '@project/hooks/airtable/use_solar_facilities';
import LoadingView from 'views/loading_view';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'routes/routes';

const DiscoverPage = () => {
    const navBarProps = useNavBar();

    const navigate = useNavigate();

    const {loading, assets} = useSolarFacilities();

    if (loading) {
        return <LoadingView></LoadingView>;
    }

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <DiscoveryContent
                assets={assets}
                onAssetClick={(asset) =>
                    navigate(ROUTES.DISCOVER + '/' + asset.id)
                }
            ></DiscoveryContent>
        </DefaultView>
    );
};

export default DiscoverPage;
