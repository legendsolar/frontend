import LogRocket from 'logrocket';
import appSettings from '../app_settings';

const getSessionId = () => {
    if (appSettings.logRocket.enabled) {
        return LogRocket.getSessionURL();
    }

    return undefined;
};

export {getSessionId};
