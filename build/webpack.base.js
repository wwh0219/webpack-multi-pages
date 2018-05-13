const path=require('path')
const paths = require('./paths')
const env = require('../config/env')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs=require('fs');
const plugins=[];


for(let prop in paths.entry){
    let path=paths.entry[prop]
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
// Object.keys(paths.entry).forEach(path=>{
//     const template=paths.entry[path].replace('scripts','template.pug')
//     try{
//         fs.accessSync(template)
//         plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
//             template,
//             filename: path+'/index.html',
//             chunks: ['runtime','vendors','style', path],
//             chunksSortMode:'manual'
//         }))
//
//     }catch (e) {
//         console.log(e)
//     }
// })

module.exports = {
    mode: process.env.NODE_ENV,
    entry: paths.entry,
    output: {
        path: paths.output,
        publicPath: paths.publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                    loader: "css-loader", options: {
                        minimize: true,
                        sourceMap: env.isDev
                    }
                }, {
                    loader: 'postcss-loader', options: {
                        sourceMap: env.isDev
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: env.isDev
                    }
                }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')]
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/[name].[hash].[ext]',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/[name].[hash].[ext]'
                }
            },
            {
                test: /\.pug$/,
                use: [
                    'html-loader?interpolate',
                    {
                        loader: 'pug-plain-loader',
                        options: {
                            pretty: true,
                            basedir: path.resolve(paths.src, './common/template'),
                            // basedir:paths.src,
                            data: {
                                publicPath: paths.publicPath,
                                viewPath: paths.viewPath
                            }
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../src')]

            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    sourceMap: env.isDev,
                    extractCSS: !env.isDev,
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: env.isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: env.isDev ? '[name].css' : '[name].[hash].css',
        }),
        ...plugins
    ]

};