'use strict'
process.env.NODE_ENV = 'production'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./webpack.prod');
const paths = require('../config/paths');
const spinner = ora('building for production...')
const glob=require('glob')
const util=require('util')
const fs=require('fs')
spinner.start()

rm(paths.output, err => {
    if (err) throw err
    webpack(config, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        const rmFiles=glob.sync(path.resolve(__dirname, `../dist/**/script.js`))
        rmFiles.push(path.resolve(__dirname, `../dist/runtime`))
        rmFiles.push(path.resolve(__dirname, `../dist/styles`))
        rmFiles.push(path.resolve(__dirname, `../dist/vendors`))
        rmFiles.forEach(path=>{
            console.log(path)
            rm(path,()=>{})
        })
        console.log(chalk.cyan('  Build complete.\n'))

    })
})
