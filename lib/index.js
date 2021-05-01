const Container = require("./container");

module.exports = function () {
  let container = new Container();

  require("./express")(container);
  require("./mongoose")(container);

  require("./helpers").loadLocations(container);

  require("./helpers").loadPlugins(container);

  require("./helpers").loadProviders(container);

  return container;
};
