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

        console.log(chalk.cyan('  Build complete.\n'))

    })
})
