module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
         proxy: {
             '/api':{
                target:'http://192.168.89.99:5002',
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