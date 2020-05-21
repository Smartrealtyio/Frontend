module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://smartrealty.ai',
                changeOrigin: true
            },
            '/': {
                target: 'https://smartrealty.ai',
                changeOrigin: true
            }
        }
    }
};