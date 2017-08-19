/*使用glob库扫描src目录下的入口JS文件*/
var glob=require('glob');

var path=require('path');

var entryPath=path.resolve(__dirname,'../src/**/*.js');

var templatePath=path.resolve(__dirname,'../src/**/template.js');

var assetPath=path.resolve(__dirname,'../dist/asset/');

var srcPath=path.resolve(__dirname,'../src').replace(/\\/g,'\/')//替换掉文件名前的绝度路径

var entryArray=glob.sync(entryPath).filter((item)=>{
    return !(/privateLibs|common|template/).test(item)
});

var templateArray=glob.sync(templatePath).filter((item)=>{
    return !(/privateLibs|common/).test(item)
});

var entryPath={};

entryArray.forEach((item)=>{
    entryPath[item.replace(srcPath,'').replace(/.js$/g,'')]=item
})
var outputPath=path.resolve(__dirname,'../dist');

module.exports={
    entry:entryPath,
    output:outputPath,
    asset:assetPath,
    template:templateArray
};
