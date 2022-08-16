import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import useNavBar from 'hooks/use_nav_bar';
import PortfolioContent from 'content/portfolio_content';

const PortfolioPage = () => {
    const navBarProps = useNavBar();

    return (
        <DefaultView navBar={<NavBar {...navBarProps}></NavBar>}>
            <PortfolioContent
                title={'Title'}
                subtitle={'SubTitle'}
                address={'Address'}
            ></PortfolioContent>
        </DefaultView>
    );
};

export default PortfolioPage;
