const glob = require('glob');
const path = require('path');
const internalIp = require('internal-ip');
const host = 'http://' + internalIp.v4.sync()
const utils = require('../build/utils')

const pagesFolder = 'pages'//页面文件所在目录

//扫描每个页面入口js文件
const entryArray = glob.sync(path.resolve(__dirname, `../src/${pagesFolder}/**/script?(.js)`))


const entry = {};//wenpack entryMap

const src = path.resolve(__dirname, '../src');
entryArray.forEach((item) => {
  entry[utils.getDistPath(item).replace(/\/script(\.js)?/, '').replace(`${pagesFolder}/`, '')] = item
});

entry.main = path.resolve(__dirname, '../src/common/main.js')

module.exports = {
  entry,
  output: path.resolve(__dirname, `../dist`),
  port: 7799,
  host,
  viewPath: `/`,
  publicPath: `/`,
  src,
  pagesFolder
};