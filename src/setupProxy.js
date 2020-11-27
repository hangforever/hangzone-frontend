// This file is responsible for routing our firebase SDK scripts
// to the firebase devserver in local development
// It is not necessary for deployments
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/__',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
