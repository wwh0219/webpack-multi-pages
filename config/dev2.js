process.env.NODE_ENV = 'development'
const pathConfig=require("./pathConfig.js")
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev')

// default port where dev server listens for incoming traffic
var port = pathConfig.port
// automatically open browser, if not set will be false
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        console.log(data)
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/static', express.static('../src/static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
