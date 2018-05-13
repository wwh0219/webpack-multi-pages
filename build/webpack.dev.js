const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const paths = require('./paths');

const dev = {
    entry:paths.entry,
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devtool:'inline-source-map'
};

module.exports = merge(base, dev);
