import {ROUTES} from 'routes/routes';
import {useLocation, useNavigate} from 'react-router-dom';
import {EmptyContentProps} from 'content/empty_content';

const useEmptyContent = () => {
    const navigate = useNavigate();

    const props: EmptyContentProps = {
        onViewAvailablePanels: () => navigate(ROUTES.DISCOVER),
    };

    return props;
};

export default useEmptyContent;
