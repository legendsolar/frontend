import NavBar from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import {useNavigate} from 'react-router-dom';
import {redirectToHomePage} from 'webflow/webflowLinking';
import {useAccount} from 'hooks/use_accounts';
import {ContentPasteSearchOutlined} from '@mui/icons-material';

const NavBarUserContext = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {useGetUserStatus} = useUser();
    const {loading, error, data} = useGetUserStatus();
    const {useWallet} = useAccount();

    const {loading: walletLoading, error: walletError, wallet} = useWallet();

    console.log(wallet);
    const userSignUpStatus = error ? null : data?.user?.status;
    const walletBalance = walletLoading || walletError ? '-' : wallet.amount;

    return (
        <NavBar
            loading={loading}
            userIsAuthenticated={!!auth.user}
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
