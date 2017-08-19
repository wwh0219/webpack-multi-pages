const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

var plugins = [
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",

        // filename: "vendor.js"
        // (给 chunk 一个不同的名字)

        minChunks: Infinity,
        // 随着 entrie chunk 越来越多，
        // 这个配置保证没其它的模块会打包进 vendor chunk
    }),

]
const templateArray = require('./pathConfig.js').template;
console.log(templateArray)
templateArray.forEach(function (item) {
    plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
        template: item,
        filename: '[name].html',
    }))
});
module.exports = plugins