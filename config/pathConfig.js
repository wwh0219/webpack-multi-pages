/*使用glob库扫描src目录下的入口JS文件*/
var glob=require('glob');

var path=require('path');

var entryPath=path.resolve(__dirname,'../src/**/scripts');

var templatePath=path.resolve(__dirname,'../src/**/template');

var staticPath=path.resolve(__dirname,'../src/**/static');

var assetPath=path.resolve(__dirname,'../dist/asset/');

var srcPath=path.resolve(__dirname,'../src');

var entryArray=glob.sync(entryPath).filter((item)=>{
    return !(/static|template/).test(item)
});

var templateArray=glob.sync(templatePath).filter((item)=>{
    return !(/static|common/).test(item)
});


var entryPath={};

entryArray.map((item)=>{
    entryPath[item.replace(srcPath,'').replace(/.js$/g,'')]=item
})
var outputPath=path.resolve(__dirname,'../dist');

module.exports={
    entry:entryPath,
    output:outputPath,
    asset:assetPath,
    template:templateArray,
    src:srcPath,
    static:[path.resolve(srcPath,'./common/static')],    
    // entryArray.map(item=>{
    //     return item.replace(path.basename(item),'static')
    // }),
    port:7788
};
