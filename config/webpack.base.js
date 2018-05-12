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


entry.vendor =pathConfig.vendor ;//第三方公共库;


const baseConfig = {
    entry: entry,
    output: {
        path: pathConfig.output,
        publicPath: pathConfig.publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js','.vue','.pug'],
        alias:{
            layout:path.resolve(__dirname,'../src/common/template'),
            common:path.resolve(pathConfig.src,'./common'),
            vue:path.resolve(__dirname,'../node_modules/vue/dist/vue.js'),
            '@':path.resolve(pathConfig.src),
            style:path.resolve(pathConfig.src,'./common/style')
        }
    },
    module: {
        rules: loaders
    },
    plugins:plugins,
    // devServer:{inline:true}
}

module.exports =baseConfig