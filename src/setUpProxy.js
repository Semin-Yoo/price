const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/entc-won", {
      target: "https://www.bw.com/api/data/v1/ticker?marketId=4326",
      changeOrigin: true,
      pathRewrite: {
        "^/entc-won": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/entc-usd", {
      target: "https://www.bw.com/api/data/v1/klines?marketId=4326&type=1H",
      changeOrigin: true,
      pathRewrite: {
        "^/entc-usd": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/upbit-btc", {
      target: "https://api.upbit.com/v1/ticker?markets=KRW-BTC",
      changeOrigin: true,
      pathRewrite: {
        "^/upbit-btc": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/upbit-eth", {
      target: "https://api.upbit.com/v1/ticker?markets=KRW-ETH",
      changeOrigin: true,
      pathRewrite: {
        "^/upbit-eth": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/upbit-xrp", {
      target: "https://api.upbit.com/v1/ticker?markets=KRW-XRP",
      changeOrigin: true,
      pathRewrite: {
        "^/upbit-xrp": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/binance", {
      target: "https://api.binance.com/api/v1/ticker/allPrices",
      changeOrigin: true,
      pathRewrite: {
        "^/binance": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/krw", {
      target: "https://exchange.jaeheon.kr:23490/query/USDKRW",
      changeOrigin: true,
      pathRewrite: {
        "^/krw": "",
      },
    })
  );
};
