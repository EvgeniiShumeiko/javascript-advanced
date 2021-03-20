const { merge } = require('webpack-merge');
const base = require('./webpack.config');

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        contentBase: './public',
        publicPath: '/assets/scripts',
        host: 'localhost',
        port: 7777,
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
})