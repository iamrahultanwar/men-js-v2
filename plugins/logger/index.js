const chalk = require("chalk");
var green = chalk.bold.green;
var yellow = chalk.bold.yellow;
var red = chalk.bold.red;
var magenta = chalk.bold.magenta;

module.exports = function (ctx) {
  const { Middleware } = ctx.container;
  const logger = (req, res, next) => {
    console.log(yellow(req.ip), green(req.method), red(req.path));
    next();
  };
  Middleware.global().set(logger);
};
