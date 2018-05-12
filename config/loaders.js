var env = require('./evn')
const path = require('path');
const pathConfig = require('./pathConfig');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const getDistPath = require('./utils').getDistPath;
module.exports = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    minimize: true,
                    sourceMap: env.isDev
                }
            }],

        })
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [{
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
        })
    },
    {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [{
                loader: "css-loader", options: {
                    minimize: true,
                    sourceMap: env.isDev
                }
            }, {
                loader: 'postcss-loader', options: {
                    sourceMap: env.isDev
                }
            }, {
                loader: "less-loader", options: {
                    sourceMap: env.isDev
                }
            }
            ]
        })
    },
    {
        test: /\.ejs$/,
        use: [
            {
                loader: 'ejs-loader',
                query: {
                    variable: 'data',
                    interpolate: '\\{\\%(.+?)\\%\\}',
                    evaluate: '\\[\\[(.+?)\\]\\]'
                }
            },

        ]
    },
    {
        test: /\.pug$/,
        use: [
            'html-loader?interpolate',
            {
                loader: 'pug-plain-loader',
                options: {
                    pretty: true,
                    basedir:path.resolve(pathConfig.src, './common/template'),
                    // basedir:pathConfig.src,
                    data:{
                        publicPath:pathConfig.publicPath,
                        viewPath:pathConfig.viewPath
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
    // {
    //     test: /\.ejs$/,
    //     loader: 'ejs-html-loader',
    //     options: {
    //         title: 'The Ant: An Introduction',
    //         production: process.env.ENV === 'production'
    //     }
    // }
]

global.src=pathConfig.src