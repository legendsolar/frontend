import {ROUTES} from 'routes/routes';
import {Location} from 'schema/schema_gen_types';
import {defaultIfNull} from 'utils/default_if_null';

export interface APP_SETTINGS {
    sentry: {
        enabled: boolean;
        sampleRate: number;
        debug: boolean;
        showReportDialogEnabled: boolean;
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
    loadingAnimationTiming_ms: number;
    defaultDiscoveryPageMapLocation: Location;
}

const settings: APP_SETTINGS = {
    sentry: {
        debug: process.env.REACT_APP_SENTRY_DEBUG === 'true',
        enabled: process.env.REACT_APP_SENTRY_ENABLED === 'true',
        sampleRate: defaultIfNull(
            process.env.REACT_APP_SENTRY_SAMPLE_RATE,
            1.0,
        ),
        showReportDialogEnabled: false,
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
    mapBoxStyleUrl: 'mapbox://styles/lassorfeasley/cl83yjanv002z15mvq9wu36io',

    // Animations
    loadingAnimationTiming_ms: 300,

    defaultDiscoveryPageMapLocation: {
        lat: 39.828175,
        lng: -98.5795,
    },
};

export default settings;
