const Container = require("./container");

let container = new Container();
require("./helpers").loadLocations(container);

require("./express")(container);
require("./mongoose")(container);
require("./models")(container);
require("./middleware")(container);

require("./helpers").loadPlugins(container);
require("./helpers").loadProviders(container);

require("./routes")(container);

const { Server } = container;

Server.emit("load-middleware");
Server.emit("load-routes");
Server.listen(1708, () => {
  console.log("Server Started");
});

module.exports = container;
