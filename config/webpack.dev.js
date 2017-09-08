process.env.NODE_ENV = 'development'
const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const pathConfig = require('./pathConfig.js');

const entry={}
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
// entry['webpack/hot/dev-server'] = 'webpack/hot/dev-server';
// entry['webpack-dev-server']=`webpack-dev-server/client?http://localhost:${pathConfig.port}/`;
for(let prop in base.entry){
    let temp=[base.entry[prop],'webpack/hot/dev-server',`webpack-dev-server/client?http://localhost:${pathConfig.port}/`];
    entry[prop]=temp
}
const dev = {
    entry,
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    devtool:'inline-source-map'
};





module.exports = merge(base, dev);
