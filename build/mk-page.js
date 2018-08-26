const {name}= require('yargs').argv;
console.log(require('yargs').argv)
const glob=require('glob')
const path=require('path')
const fs=require('fs')
const fse=require('fs-extra')
const handlebars=require('handlebars')
const files = glob.sync(path.resolve(__dirname,'../config/page-template/**/*'))
const {pagesFolder,src}=require('../config/paths')
const dir=path.resolve(src,pagesFolder,name)
const fileRegexp=/[\\\/].*\.[A-z]*$/
if(fs.existsSync(dir)){
  console.log('目录已存在')
  process.exit(1)
}else{
  fse.mkdirpSync(dir)
  files.forEach(fileName => {
    try {
      const content = fs.readFileSync(fileName).toString()
      const result = handlebars.compile(content)({name})
      fs.writeFileSync(path.resolve(dir,path.basename(fileName)), result)
    } catch (e) {
      console.log(e)
    }
  })
}

