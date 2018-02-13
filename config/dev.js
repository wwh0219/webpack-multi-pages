process.env.NODE_ENV = 'development'
const Webpack = require("webpack");
const pathConfig = require("./pathConfig.js")
const path = require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.dev");
const opn = require('opn')
const options = {
    host: "0.0.0.0",
    disableHostCheck: true,
    stats: {
        colors: true
    },
    contentBase: false,
    inline: true,//刷新
    // hot: true,//热加载
    compress: true,
    progress: false,
    publicPath:pathConfig.publicPath,
    quiet: true,
    watchOptions: {
        poll: true
    }
    // inline:true
}


WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, options);
const uri = `${pathConfig.host}:${pathConfig.port}/`
server.listen(pathConfig.port, "0.0.0.0", function () {
    console.log(`Starting server on ${uri}`);
    // opn(uri)
});