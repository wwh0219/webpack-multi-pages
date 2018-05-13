const base=require('./base.env')
const merge = require('webpack-merge');

const defineEnv=merge(base,{
    production:true
})

for(let prop in defineEnv){
    defineEnv[prop]=JSON.stringify(defineEnv[prop])
}
module.exports=defineEnv