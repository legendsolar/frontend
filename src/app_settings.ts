import {ROUTES} from "routes/routes";

export interface APP_SETTINGS {
    sentry: {
        enabled: boolean;
        sampleRate: number;
    },
    logRocket: {
        enabled: boolean;
    },
    fullStory: {
        enabled: boolean;
    },
    timeout_ms: number;
    emailVerificationRedirectUrl: string;
    minPlatformAge: number;
}

const settings : APP_SETTINGS = {
    sentry: {
        enabled: true,
        sampleRate: 1.0, // adjust in production
    },
    logRocket: {
        enabled: false,
    },
    fullStory: {
        enabled: false,
    },
    timeout_ms: 5000,
    emailVerificationRedirectUrl:
        process.env.REACT_APP_BASE_URL + ROUTES.COMPLETE_ACCOUNT,

    minPlatformAge: 18,
};

export default settings;
