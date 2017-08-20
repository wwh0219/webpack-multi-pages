const path = require('path');
const pathConfig = require('./pathConfig');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const getDistPath = require('./utils').getDistPath;
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            presets: ['latest']
          }
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
          },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/[name].[hash].[ext]',
        }
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: ['css-loader', 'sass-loader']
        })
    },
    {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        query: {
            variable: 'data',
            interpolate: '\\{\\{(.+?)\\}\\}',
            evaluate: '\\[\\[(.+?)\\]\\]'
        }
    }
]