process.env.NODE_ENV = 'development'
const Webpack = require("webpack");
const pathConfig=require("./pathConfig.js")
const path=require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.dev");
const compiler = Webpack(webpackConfig);
const opn = require('opn')


const server = new WebpackDevServer(compiler, {
	stats: {
		colors: true
    },
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    // inline:true
});

const uri=`http://localhost:${pathConfig.port}/`

server.listen(pathConfig.port, "127.0.0.1", function() {
	console.log(`Starting server on ${uri}`);
    // opn(uri)
});