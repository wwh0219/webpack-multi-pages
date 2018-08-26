# webpack多页项目模板

## 项目名称：{{name}}

>{{description}}
## 目录结构
```
├─build 构建配置
├─config  项目环境变量配置
│  └─langs
└─src
    ├─common  公用资源目录
    │  ├─asset
    │  ├─style
    │  └─template 公用布局模板
    └─pages
        └─home    页面文件目录
            ├─scripts       存放js文件
            ├─style.scss    样式文件
            ├─template.pug  pug模板
```
## 使用说明
- a标签跳转写法
```pug
a(href=`${viewPath}page`)  //page是相对pages下某个具体页面目录的路径
```
- 图片引用
```pug
img(src='${require(`@/common/assets/img-de.png`)}') //此写法下的图片会被webpack打包处理
```
- 生成目录
```shell
npm run mk-page -- --name={{name}}
```
