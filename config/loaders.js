const path = require('path');
const pathConfig = require('./pathConfig');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
   filename: "[name].[contenthash].css",
   disable: process.env.NODE_ENV === "development"
});
module.exports=[
    {
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: path.resolve(pathConfig.asset, './img/[name].[chunkHash].[ext]')
        }
    },
    {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
    },
    {
        test: /\.ejs$/,
        loader: 'ejs-html-loader',
        options: {
          title: 'The Ant: An Introduction',
          season: 1,
          episode: 9,
          production: process.env.ENV === 'production'
        }
      }
]