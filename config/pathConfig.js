/*使用glob库扫描src目录下的入口JS文件*/
var glob=require('glob');

var os=require('os')

var host='http://'+os.networkInterfaces()['以太网'][1].address

var path=require('path');

var entryPath=path.resolve(__dirname,'../src/pages/**/scripts/index.js');

var templatePath=path.resolve(__dirname,'../src/**/template.pug');

var staticPath=path.resolve(__dirname,'../src/**/static');

var assetPath=path.resolve(__dirname,'../dist/asset/');

var srcPath=path.resolve(__dirname,'../src');

var entryArray=glob.sync(entryPath).filter((item)=>{
    return !(/static|template|libSource/).test(item)
});

var templateArray=glob.sync(templatePath).filter((item)=>{
    return !(/static|common/).test(item)
});


var entryPath={};

entryArray.map((item)=>{
    entryPath[item.replace(srcPath,'').replace(/.js$/g,'').replace('scripts','')]=item
})
var outputPath=path.resolve(__dirname,'../dist');

module.exports={
    entry:entryPath,
    output:outputPath,
    asset:assetPath,
    template:templateArray,
    publicPath:'/fzlx/mobile/', 
    src:srcPath,
    static:[path.resolve(srcPath,'./static')],
    port:7799,
    vendor:path.resolve(srcPath, './common/vendor'),
    host,
    viewPath:'/fzlx/mobile/pages'//页面所在目录
};
