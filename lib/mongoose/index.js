const mongoose = require("mongoose");

require("./operations").initialize(mongoose);

module.exports = function (c) {
  c.service("Database", (c) => mongoose);
};
