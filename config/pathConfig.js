/*使用glob库扫描src目录下的入口JS文件*/
const glob=require('glob');

const os=require('os')
function getIPAdress(){
    const interfaces = require('os').networkInterfaces();
    for(const devName in interfaces){
        const iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            const alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
const host='http://'+getIPAdress()

const path=require('path');

const entryPath=path.resolve(__dirname,'../src/pages/**/scripts');

const templatePath=path.resolve(__dirname,'../src/**/template.pug');

const staticPath=path.resolve(__dirname,'../src/**/static');

const assetPath=path.resolve(__dirname,'../dist/asset/');

const srcPath=path.resolve(__dirname,'../src');

const entryArray=glob.sync(entryPath).filter((item)=>{
    return !(/static|template|libSource/).test(item)
});

const templateArray=glob.sync(templatePath).filter((item)=>{
    return !(/static|common/).test(item)
});

const getDistPath=require('./utils').getDistPath;

const entryPathMap={};

entryArray.forEach((item)=>{
    entryPathMap[item]=item
})
const outputPath=path.resolve(__dirname,'../dist');

const chunksMap={}

for(let prop in entryPathMap){
    let p=getDistPath(prop)
    chunksMap[p]= entryPathMap[prop]
}
chunksMap.style=path.resolve(srcPath,'./common/style.js')

module.exports={
    entry:entryPathMap,
    output:outputPath,
    asset:assetPath,
    template:templateArray,
    publicPath:'/boe/',
    src:srcPath,
    static:[path.resolve(srcPath,'./static')],
    port:7799,
    host,
    viewPath:'/boe/pages',//页面所在目录
    chunksMap
};
