import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';

const PortfolioPage = () => {
    const navBarProps = useNavBar();

    return (
        <DefaultView
            authenticated={navBarProps.userIsAuthenticated}
            navBar={<NavBar {...navBarProps}></NavBar>}
        >
            <div>portfolio</div>
        </DefaultView>
    );
};

export default PortfolioPage;
