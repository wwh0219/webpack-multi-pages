#webpack-multi-pages;
```
-├─config                //webpack配置     
-├─dist                  //发布包          
-├─src                   //源码            
-│  ├─common             //公用            
-│  │  ├─style                            
-│  │  └─template                         
-│  ├─pages              //页面            
-│  │  └─pageExample     //示例 需要有一个template.pug作为入口
-│  │      ├─sass        //样式表
-│  │      └─scripts     //脚本入口，需要有一个index.js
-│  └─static             //静态文件
-│      ├─css
-│      ├─image
-│      └─js
```