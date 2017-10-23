var isDev=require('./evn');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getDistPath = require('./utils').getDistPath;

const pathConfig = require('./pathConfig');

const staticPath = pathConfig.static;


const ReloadPlugin = require('reload-html-webpack-plugin');

const plugins = [
    new ExtractTextPlugin({//抽出js中的css
        disable:isDev,
        filename: (getPath) => {
            return getPath('[name].css');
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({//抽出公共库
        name: "vendor",

        // filename: "vendor.js"
        // (给 chunk 一个不同的名字)

        minChunks: 2,
        // 随着 entrie chunk 越来越多，
        // 这个配置保证没其它的模块会打包进 vendor chunk
    }),

]
const templatePath = pathConfig.template;

templatePath.map(function (item) {//生产html文件
    var p = getDistPath(item);
    plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
        template: item,
        filename: p.replace('template.pug', 'index.html'),
        chunks: ['vendor','common/scripts', p.replace(/template\.pug/, 'scripts')],
        chunksSortMode:'manual'
    }))

});
const copyStaticPath = staticPath.map(function (item) {//拷贝静态文件
    return {
        from: item,
        to: getDistPath(item),
        toType: 'dir'
    }

});
plugins.push(new CopyWebpackPlugin(copyStaticPath)/*, new ReloadPlugin()*/)

module.exports = plugins