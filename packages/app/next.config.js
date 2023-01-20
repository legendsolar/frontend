module.exports = {
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
