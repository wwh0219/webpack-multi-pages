const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var pathConfig = require('./pathConfig.js');
const pro = {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool:false
};





module.exports = merge(base, pro);

