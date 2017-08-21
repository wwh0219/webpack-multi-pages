/*node模块 */
var path = require('path');
var webpack = require('webpack');
/*配置文件*/
var pathConfig = require('./pathConfig.js');
var plugins=require('./plugins');
var loaders=require('./loaders');
var getDistPath=require('./utils').getDistPath;
/*输出配置*/
var entry={};

for(var prop in pathConfig.entry){
    var p=getDistPath(prop)
    entry[p]= pathConfig.entry[prop]
}

entry.vendor = ['babel-polyfill'];//第三方公共库;
entry['webpack/hot/dev-server']='webpack/hot/dev-server';
entry['webpack-dev-server']=`webpack-dev-server/client?http://localhost:${pathConfig.port}/`;
module.exports = {
    entry: entry,
    output: {
        path: pathConfig.output,
        publicPath: "../",
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js'],
        alias:{
            layout:path.resolve(__dirname,'../src/common/template')
        }
    },
    module: {
        rules: loaders
    },
    plugins:plugins,
    // devServer:{inline:true}
}