const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const paths = require('../config/paths');
const defineEnv=require('../config/dev.env')
const dev = {
    entry:paths.entry,
    output: {
        filename: '[name]/script.js',
        chunkFilename: '[name]/script.js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            ENV:defineEnv
        })
    ],
    devtool:'source-map'
};

module.exports = merge(base, dev);
