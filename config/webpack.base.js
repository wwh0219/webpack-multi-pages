/*node模块 */
var path = require('path');
var webpack = require('webpack');
/*配置文件*/
var pathConfig = require('./pathConfig.js');
var plugins=require('./plugins');
var loaders=require('./loaders');

/*输出配置*/
pathConfig.entry.vendor = ['babel-polyfill']//第三方公共库;

module.exports = {
    entry: pathConfig.entry,
    output: {
        path: pathConfig.output,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: loaders
    },
    plugins:plugins
}