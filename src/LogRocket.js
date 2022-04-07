import LogRocket from "logrocket";

const getSessionId = () => {
    if (appSettings.logRocket.enabled) {
        return LogRocket.getSessionURL();
    }

    return undefined;
};

export { getSessionId };
