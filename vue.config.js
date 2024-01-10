const webpack = require('webpack');
const API_TARGET = 'http://api.ks.qfpek.com:8181';
// const API_TARGET = 'http://192.168.123.200:8181';

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host:"127.0.0.1",
        port: 8084,
        proxy: {
            '/api':{
                //target:'http://127.0.0.1:5004',
                // target:'https://localhost:5001',
                // target:'http://192.168.123.200:5001',
                //target:'http://api.ks.qfpek.com:8181',
                //target:'https://api.ss1.relink-tech.cn',
                /////target:'https://huapi.ss1.relink-tech.cn',
                target: API_TARGET,
                changeOrigin:true,
                //pathRewrite:{
                //    '/api':''
                //}
            },
            '/cc':{
                target:'https://tcc.taobao.com',
                //target:'https://localhost:5001',
                //target:'https://api.ss1.relink-tech.cn',
                changeOrigin:true,
                //pathRewrite:{
                //    '/api':''
                //}
            }
        }
    },
    configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
        'process.env': {
            'VUE_APP_API_TARGET': JSON.stringify(API_TARGET),
        },
        }),
    ],
    },
}