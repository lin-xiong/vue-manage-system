module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host:"0.0.0.0",
        port: 8080,
        proxy: {
            '/api':{
                //target:'http://127.0.0.1:5004',
                // target:'https://localhost:5001',
                // target:'http://192.168.123.200:5001',
                target:'http://bt.qfpek.com:8181',
                //target:'https://api.ss1.relink-tech.cn',
                /////target:'https://huapi.ss1.relink-tech.cn',
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
    }
}