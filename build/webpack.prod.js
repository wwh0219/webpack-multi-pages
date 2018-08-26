const merge = require('webpack-merge');
const base = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defineEnv = require('../config/dev.env')
const webpack = require('webpack')
const prod = {
  output: {
    filename: '[name]/script.[chunkhash].js',
    chunkFilename: '[name]/script.[chunkhash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]/style.[hash].css',
      chunkFilename: '[name]/style.[hash].css',
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new webpack.DefinePlugin({
      ENV: defineEnv
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /([\\/](node_modules|common)[\\/]).*\.(scss|js)$/,
          name: "vendors",
          chunks: "all",
          minSize: 1
        }
      },

    },
    runtimeChunk: 'single'
  },
  devtool: false
};


module.exports = merge(base, prod);

