const path=require('path')
const paths = require('./paths')
const env = require('./env')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },
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
        new ExtractTextPlugin({//抽出js中的css
            disable:env.isDev,
            filename: (getPath) => {
                return getPath('[name].[contenthash].css');
            }
        })
    ]
};