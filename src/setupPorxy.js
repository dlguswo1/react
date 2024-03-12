const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/endpoint", {
      target: "endpoint를 제외한 출처",
      changeOrigin: true,
    })
  );
};