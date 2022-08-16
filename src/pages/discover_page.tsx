import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import DiscoveryContent from 'content/discovery_content';
import assetData from 'static_data/assets';
import useNavBar from 'hooks/use_nav_bar';

const DiscoverPage = () => {
    const navBarProps = useNavBar();

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <DiscoveryContent assets={assetData}></DiscoveryContent>
        </DefaultView>
    );
};

export default DiscoverPage;
