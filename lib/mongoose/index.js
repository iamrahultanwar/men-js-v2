const mongoose = require("mongoose");

module.exports = function (c) {
  c.service("Database", (c) => mongoose);
};
