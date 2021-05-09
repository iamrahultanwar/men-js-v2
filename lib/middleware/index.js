module.exports = function (ctx) {
  const { Server } = ctx.container;
  class Middleware {
    constructor() {
      this._global = [];
      this._named = [];
    }
    global() {
      return {
        get: () => this._global,
        set: (middleware) => this._global.push(middleware),
      };
    }
  }

  ctx.service("Middleware", Middleware);

  Server.on("load-middleware", () => {
    const m = ctx.container.Middleware.global().get();
    if (m.length) Server.use(m);
  });
};
