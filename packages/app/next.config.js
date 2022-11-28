const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@project/components",
  "@project/hooks",
  "@p/schema",
  "@p/utils",
]);

module.exports = withPlugins([withTM]);
