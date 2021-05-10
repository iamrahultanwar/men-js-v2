const mongoose = require("mongoose");

require("./operations").initialize(mongoose);

module.exports = function (c) {
  c.provider("Database", function () {
    // this is the service factory.
    this.$get = function (_) {
      return mongoose;
    };
  });
};
