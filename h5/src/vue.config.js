module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    
}