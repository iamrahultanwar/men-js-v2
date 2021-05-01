const Container = require("./container");

module.exports = function () {
  let container = new Container();

  require("./express")(container);
  require("./mongoose")(container);

  require("./helpers").loadLocations(container);

  require("./helpers").loadProviders(container);

  require("./helpers").loadPlugins(container);

  return container;
};
