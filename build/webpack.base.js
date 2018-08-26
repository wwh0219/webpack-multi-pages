const path = require('path')
const paths = require('../config/paths')
const env = require('../config/base.env')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack')
const favicon = path.resolve(paths.src, './common/assets/favicon.ico')
const plugins = [];
const de = require("../config/langs/de.json")//多语言文件

Object.keys(paths.entry).forEach(path => {
  const template = paths.entry[path].replace(/script(\.js)?/, '') + 'template.pug';
  try {
    fs.accessSync(template)
    plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
      template,
      filename: path + '/index.html',
      chunks: ['runtime', 'vendors', 'main', path],
      chunksSortMode: 'manual',
      minify: true,
      favicon
    }))

  } catch (e) {

  }
})

module.exports = {
  mode: process.env.NODE_ENV,
  entry: paths.entry,
  output: {
    path: paths.output,
    publicPath: paths.publicPath,
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
              sourceMap: env.isDev,
              data: `@import "style/import.scss";`
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
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          },
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
        test: /\.less/,
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
            loader: "less-loader", options: {
              sourceMap: env.isDev
            }
          }
        ]
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
  resolve: {
    extensions: ['.js', '.vue', '.pug'],
    alias: {
      '@': path.resolve(paths.src),
      style: path.resolve(paths.src, './common/style'),
    }
  },
  plugins: [
    ...plugins
  ]

};