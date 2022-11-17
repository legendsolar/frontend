const path = require('path');
const {
    override,
    babelInclude,
    addBabelPreset,
    addExternalBabelPlugin,
    addWebpackAlias,
    removeModuleScopePlugin,
} = require('customize-cra');

module.exports = override(
    // removeModuleScopePlugin(),
    // addWebpackAlias({
    //     ['@project/components']: path.resolve(__dirname, '../components'),
    //     ['@project/hooks']: path.resolve(__dirname, '../hooks'),
    //     ['@p/utils']: path.resolve(__dirname, '../utils'),
    //     ['@p/schema']: path.resolve(__dirname, '../schema'),
    // }),

    babelInclude([
        path.resolve('src'),
        path.resolve('../components'),
        path.resolve('../hooks'),
        path.resolve('../schema'),
        path.resolve('../utils'),
    ]),
);
