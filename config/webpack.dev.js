const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const pathConfig = require('./pathConfig.js');

const entry={}
for(let prop in base.entry){
    let temp=[base.entry[prop]];
    entry[prop]=temp
}
const dev = {
    entry,
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()

    ],
    devtool:'inline-source-map'
};





module.exports = merge(base, dev);
