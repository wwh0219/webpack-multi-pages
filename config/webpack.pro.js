const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var pathConfig = require('./pathConfig.js');
const pro = {
    output: {
        path: pathConfig.output,
        publicPath: "../",//二级目录“../../”  一级目录“../”
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            sourceMap: false
          }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool:false
};





module.exports = merge(base, pro);

