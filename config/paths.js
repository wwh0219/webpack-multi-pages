const glob=require('glob');
const path=require('path');
const internalIp = require('internal-ip');
const host='http://'+internalIp.v4.sync()
const utils=require('../build/utils')

const pagesFolder='pages'//页面文件所在目录

//扫描每个页面入口js文件
const entryArray = glob.sync(path.resolve(__dirname, `../src/${pagesFolder}/**/scripts`))


const entry={};//wenpack entryMap

const src=path.resolve(__dirname,'../src');
entryArray.forEach((item)=>{
    entry[utils.getDistPath(item).replace('/scripts','')]=item
});



module.exports={
    entry,
    output:path.resolve(__dirname,`../dist`),
    port:7799,
    host,
    viewPath: `/${pagesFolder}`,
    publicPath:`/`,
    src
};