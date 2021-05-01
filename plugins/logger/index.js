module.exports = function (ctx) {
  ctx.Server.use((req, res, next) => {
    console.log(req.path);
    next();
  });
};
