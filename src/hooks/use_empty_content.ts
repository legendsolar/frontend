import {ROUTES} from 'routes/routes';
import {useLocation, useNavigate} from 'react-router-dom';
import {EmptyContentProps} from 'content/empty_content';

const useEmptyContent = ({messageOverride}: {messageOverride?: string}) => {
    const navigate = useNavigate();

    const props: EmptyContentProps = {
        messageOverride,
        onViewAvailablePanels: () => navigate(ROUTES.DISCOVER),
    };

    return props;
};

export default useEmptyContent;
