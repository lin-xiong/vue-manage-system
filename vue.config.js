module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
         proxy: {
             '/api':{
                 target:'https://localhost:5001',
                 changeOrigin:true,
                 //pathRewrite:{
                 //    '/api':''
                 //}
             }
         }
     }
}