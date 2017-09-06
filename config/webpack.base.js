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

entry.vendor = path.resolve(pathConfig.src,'./common/scripts/vendor');//第三方公共库;
entry['webpack/hot/dev-server']='webpack/hot/dev-server';
entry['webpack-dev-server']=`webpack-dev-server/client?http://localhost:${pathConfig.port}/`;
module.exports = {
    entry: entry,
    output: {
        path: pathConfig.output,
        publicPath: "../",//二级目录“../../”  一级目录“../”
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js'],
        alias:{
            layout:path.resolve(__dirname,'../src/common/template'),
            common:path.resolve(pathConfig.src,'./common'),
            vue:path.resolve(__dirname,'../node_modules/vue/dist/vue.js')
        }
    },
    module: {
        rules: loaders
    },
    plugins:plugins,
    devtool:'cheap-eval-source-map'
    // devServer:{inline:true}
}