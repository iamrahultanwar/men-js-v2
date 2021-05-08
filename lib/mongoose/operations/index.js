const field = require("./field");
const filter = require("./filter");
const keyword = require("./keyword");
const order = require("./order");
const page = require("./page");

module.exports = ((self = {}) => {
  self.initialize = function (options, mongoose) {
    if (typeof mongoose === "undefined") {
      mongoose = options;
      options = null;
    }

    // require all modules
    field(mongoose);
    filter(mongoose);
    keyword(mongoose);
    order(mongoose);
    page(mongoose).initialize(options);
  };

  self.utils = require("./utils");

  return self;
})();
