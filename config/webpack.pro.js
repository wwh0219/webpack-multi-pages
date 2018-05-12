const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var pathConfig = require('./pathConfig.js');
const env=require('./evn')
const pro = {
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        })
    ],
    devtool:false
};





module.exports = merge(base, pro);

