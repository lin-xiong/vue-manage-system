module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
         proxy: {
             '/api':{
                 target:'https://localhost:5001',
                 //target:'https://api.ss1.relink-tech.cn',
                 changeOrigin:true,
                 //pathRewrite:{
                 //    '/api':''
                 //}
             }
         }
     }
}