const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  transpilePackages: [
    "@project/components",
    "@project/hooks",
    "@p/schema",
    "@p/utils",
  ],
  typescript: { ignoreBuildErrors: true },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = withSentryConfig(moduleExports, {
  // sentry plugin options
  silent: true,
});
