const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
var pathConfig = require('./pathConfig.js');

const entry={}

entry['webpack/hot/dev-server'] = 'webpack/hot/dev-server';
entry['webpack-dev-server']=`webpack-dev-server/client?http://localhost:${pathConfig.port}/`;

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
