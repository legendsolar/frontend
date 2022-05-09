export default {
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
        process.env.REACT_APP_BASE_URL + '/complete-account',
};
