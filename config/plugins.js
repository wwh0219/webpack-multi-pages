const env=require('./evn');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs=require('fs')
const getDistPath = require('./utils').getDistPath;

const pathConfig = require('./pathConfig');

const staticPath = pathConfig.static;
//环境变量
const localEnv={}
for(let prop in env){
    localEnv[prop]=JSON.stringify(env[prop])
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env':localEnv
    }),
    new ExtractTextPlugin({//抽出js中的css
        disable:env.isDev,
        filename: (getPath) => {
            return getPath('[name].[contenthash].css');
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks (module) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                ) === 0
            )
        }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: Object.keys(pathConfig.chunksMap),
        async: 'vendor-async',
        children: true,
        minChunks: 3
    })
]



for(let prop in pathConfig.chunksMap){
    let path=pathConfig.chunksMap[prop]
    path=path.replace('scripts','');
    const template=path+'template.pug'
    try{
        fs.accessSync(template)
        plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
            template: path+'template.pug',
            filename: prop.replace('scripts','')+'index.html',
            chunks: ['manifest','vendor','style', prop],
            chunksSortMode:'manual'
        }))

    }catch (e) {

    }

}

const copyStaticPath = staticPath.map(function (item) {//拷贝静态文件
    return {
        from: item,
        to: getDistPath(item),
        toType: 'dir'
    }

});
plugins.push(new CopyWebpackPlugin(copyStaticPath)/*, new ReloadPlugin()*/)

module.exports = plugins
