const isDev=(process.env.NODE_ENV === 'development');
const env=Object.assign({isDev},require('./pathConfig'))

module.exports=env;