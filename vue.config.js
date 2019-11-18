module.exports = {
  lintOnSave:false,
  devServer: {
    // 用来真机调试
    host: "0.0.0.0",
    // 代理方式处理跨域 (面试必问)
    proxy: {
      "/api": {
        ws: false,
        // target就是请求接口的根路径
        target: "http://localhost:7001/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
