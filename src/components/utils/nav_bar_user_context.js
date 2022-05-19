import NavBar from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import {useLocation, useNavigate} from 'react-router-dom';
import {redirectToHomePage} from 'webflow/webflowLinking';
import {useAccount} from 'hooks/use_accounts';

const NavBarUserContext = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {useGetUserStatus} = useUser();
    const {loading, error, status} = useGetUserStatus();
    const {useWallet} = useAccount();

    const {loading: walletLoading, error: walletError, wallet} = useWallet();

    const userSignUpStatus = error || loading ? null : status;
    const walletBalance = walletLoading || walletError ? '-' : wallet?.amount;

    const userIsAuthenticated =
        location.pathname == '/complete-account' || !!auth.user;

    console.log(location.pathname);
    return (
        <NavBar
            loading={loading}
            userIsAuthenticated={userIsAuthenticated}
            userStatus={userSignUpStatus}
            walletBalance={walletBalance}
            onToHomepage={redirectToHomePage}
            onYourRooftop={() => navigate('/')}
            onTransaction={() => navigate('/transactions')}
            onDocuments={() => navigate('/documents')}
            onAvailablePanels={() => navigate('/explore')}
            onAccount={() => navigate('/account')}
            onWallet={() => navigate('/wallet')}
        ></NavBar>
    );
};

export default NavBarUserContext;
