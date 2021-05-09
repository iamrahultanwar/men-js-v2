module.exports = function (ctx) {
  const { Server } = ctx;
  const Middleware = {};

  Middleware.global = {
    middleware: [],
    get: () => Middleware.global.middleware,
    set: (middleware) => Middleware.global.middleware.push(middleware),
  };

  Server.on("load-middleware", () => {
    Server.use(Middleware.global.middleware);
  });

  ctx.service("Middleware", (ctx) => Middleware);
};
