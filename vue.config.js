const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  pages:{
    index:{
      entry:'src/main.js'
    }
  },
  transpileDependencies: true,
  //关闭esline校验
  lintOnSave:false,
  devServer: {
   host: 'localhost',
   port: 8082,
    open:true,
    proxy:{
        '/user':{target:'http://zhi.com:88',changeOrigin:true,pathRewrite:{}},
        '/qa':{target:'http://zhi.com:88',changeOrigin:true,pathRewrite:{}},
        '/res':{target:'http://zhi.com:88',changeOrigin:true,pathRewrite:{'^/res':'/user/res'}},
        
    } 
  }



})
