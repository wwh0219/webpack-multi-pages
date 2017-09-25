process.env.NODE_ENV = 'development'
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./webpack.dev');
var pathConfig = require('./pathConfig');
var merge = require('webpack-merge');
var spinner = ora('building for production...')
spinner.start()
config=merge(config, {
    watch:true
});


rm(pathConfig.output, err => {
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
