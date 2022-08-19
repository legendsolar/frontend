import {ROUTES} from 'routes/routes';
import {defaultIfNull} from 'utils/default_if_null';

export interface APP_SETTINGS {
    sentry: {
        enabled: boolean;
        sampleRate: number;
        debug: boolean;
    };
    logRocket: {
        enabled: boolean;
    };
    fullStory: {
        enabled: boolean;
    };
    timeout_ms: number;
    emailVerificationRedirectUrl: string;
    minPlatformAge: number;
    mapBoxStyleUrl: string;
}

const settings: APP_SETTINGS = {
    sentry: {
        debug: process.env.REACT_APP_SENTRY_DEBUG === 'true',
        enabled: process.env.REACT_APP_SENTRY_ENABLED === 'true',
        sampleRate: defaultIfNull(
            process.env.REACT_APP_SENTRY_SAMPLE_RATE,
            1.0,
        ),
    },
    logRocket: {
        enabled: process.env.REACT_APP_LOG_ROCKET_ENALBED === 'true',
    },
    fullStory: {
        enabled: process.env.REACT_APP_FULLSTORY_ENABLED === 'true',
    },
    timeout_ms: 5000,
    emailVerificationRedirectUrl:
        process.env.REACT_APP_BASE_URL + ROUTES.COMPLETE_ACCOUNT,

    minPlatformAge: 18,
    mapBoxStyleUrl: 'mapbox://styles/lassorfeasley/cl6o7cer3004314mli5jr7zos',
};

export default settings;
