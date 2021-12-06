const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
      createProxyMiddleware('/api1', {
        target: process.env.REACT_APP_SERVER_BASE_URL, // API endpoint 1
        changeOrigin: true,
        pathRewrite: {
          "^/api1": "",
        },
        headers: {
          Connection: "keep-alive"
        }
      })
    );
  }