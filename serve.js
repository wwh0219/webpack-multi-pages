/**
 *
 * @description 打包后静态文件服务器
 */

var express = require('express');

var app = express();
app.use('/fzlx/mobile', express.static('./dist'));
app.listen(3002)
