const Webpack = require("webpack");
const path=require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.base");
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	stats: {
		colors: true
    },
    contentBase: path.join(__dirname, "../dist")
});

server.listen(7788, "127.0.0.1", function() {
	console.log("Starting server on http://localhost:7788");
});