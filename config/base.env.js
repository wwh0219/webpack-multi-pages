const paths=require('./paths')
module.exports={
    isDev:process.env.NODE_ENV==='development',
    ...paths
}