var path=require('path');
module.exports = {
    getDistPath: function (currentPath) {//将文件的src路径替换为dist下的相对路径
        return path.relative(
            path.resolve(__dirname, '../src'),
            currentPath
        ).replace(/\\/g,'\/')
    }
}