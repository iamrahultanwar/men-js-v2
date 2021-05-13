const Container = require("./container");

const container = new Container();

require("./express")(container);
require("./helpers").loadLocations(container);
require("./view")(container);
require("./mongoose")(container);
require("./models")(container);
require("./middleware")(container);

require("./helpers").loadPlugins(container);
require("./helpers").loadProviders(container);
require("./routes")(container);

const { Server } = container.container;

Server.emit("load-middleware");
Server.emit("load-routes");
Server.listen(1708, () => {
  console.log("Server Started");
});

module.exports = container;
