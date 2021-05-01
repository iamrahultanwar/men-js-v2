var bodyParser = require("body-parser");

module.exports = function (ctx) {
  // parse application/x-www-form-urlencoded
  ctx.Server.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  ctx.Server.use(bodyParser.json());
};
