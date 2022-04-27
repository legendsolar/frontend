import NavBar from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import {useNavigate} from 'react-router-dom';
import {redirectToHomePage} from 'webflow/webflowLinking';

const NavBarUserContext = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {useGetUserStatus} = useUser();
    const {loading, error, data} = useGetUserStatus();

    const userSignUpStatus = error ? null : data?.user?.status;
    const walletBalance = 'not real';

    return (
        <NavBar
            loading={loading}
            userIsAuthenticated={!!auth.user}
            userStatus={userSignUpStatus}
            walletBalance={walletBalance}
            onToHomepage={redirectToHomePage}
            onYourRooftop={() => navigate('/')}
            onTransaction={() => navigate('/')}
            onDocuments={() => navigate('/')}
            onAvailablePanels={() => navigate('/')}
            onAccount={() => navigate('/')}
        ></NavBar>
    );
};

export default NavBarUserContext;
