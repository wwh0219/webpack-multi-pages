/*node模块 */
const path = require('path');
const webpack = require('webpack');
/*配置文件*/
const pathConfig = require('./pathConfig.js');
const plugins=require('./plugins');
const loaders=require('./loaders');
/*输出配置*/



const baseConfig = {
    entry: pathConfig.chunksMap,
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