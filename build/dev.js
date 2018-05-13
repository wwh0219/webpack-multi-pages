process.env.NODE_ENV = 'development'
const webpack = require("webpack");
const paths = require("./paths")
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.dev");
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
server.listen(paths.port, "0.0.0.0", function () {
    console.log(`Starting server on ${uri}`);
});