const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defineEnv=require('../config/dev.env')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path=require('path')
const prod = {
    output: {
        filename: '[name]/script.js',
        chunkFilename: '[name]/script.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new webpack.DefinePlugin({
            ENV:defineEnv
        }),
        new CopyWebpackPlugin([
            {
                from:path.resolve(__dirname,'../src/static/'),
                to:path.resolve(__dirname,'../dist/static'),
                toType:'dir'
            }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true
                },
                vendor: {
                    test: /([\\/](node_modules|common)[\\/]).*(\.js$)/,
                    name: "vendors",
                    chunks: "all",
                    minSize:1
                },
            },

        },
        runtimeChunk:'single'
    },
    devtool:false
};





module.exports = merge(base, prod);

