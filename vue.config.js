module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
         proxy: {
             '/api':{
                //target:'http://127.0.0.1:5004',
                //target:'https://localhost:5001',
                target:'http://192.168.0.5:5001',
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