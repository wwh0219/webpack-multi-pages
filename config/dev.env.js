const base=require('./base.env')
const merge = require('webpack-merge');

const defineEnv=merge(base,{
    development:true
})

for(let prop in defineEnv){
    defineEnv[prop]=JSON.stringify(defineEnv[prop])
}
module.exports=defineEnv