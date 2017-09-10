module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')(
            {
                browsers:['ie >=8','iOS >=7','Firefox > 20','Chrome > 20','Safari > 10']
            }
        )
    ],
    sourceMap:process.env.NODE_ENV == 'development'
}