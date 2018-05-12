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
    new webpack.optimize.CommonsChunkPlugin({//抽出公共库
        name: "vendor",
        // filename: "vendor.js"
        // (给 chunk 一个不同的名字)

        minChunks: 2,
        // 随着 entrie chunk 越来越多，
        // 这个配置保证没其它的模块会打包进 vendor chunk
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
            chunks: ['vendor','style', prop],
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
