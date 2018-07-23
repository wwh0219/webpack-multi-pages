'use strict'
process.env.NODE_ENV = 'development'
const webpack = require('webpack');
const paths = require('../config/paths')
const path = require('path')
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev');
const options = {
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: {
        colors: true
    },
    inline: true,//刷新
    contentBase: path.join(__dirname, '../src'),
    compress: true,
    progress: false,
    publicPath:paths.publicPath,
    watchOptions: {
        poll: true
    }
    // inline:true
}

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);
const uri = `${paths.host}:${paths.port}/`
server.listen(paths.port, '0.0.0.0', function () {
    console.log(`Starting server on ${uri}`);
});