const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const pathConfig = require('./pathConfig.js');

const entry={}
for(let prop in base.entry){
    let temp=[path.resolve(__dirname,'./dev-client'),base.entry[prop]];
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
