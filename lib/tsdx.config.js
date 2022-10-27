const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(
      nodeResolve({ moduleDirectories: ['./src', 'node_modules'] })
    );

    return config;
  },
};
