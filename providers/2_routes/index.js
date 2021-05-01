module.exports = function (ctx) {
  const controllerList = ctx.Locations.get("controllers").all();
  const Server = ctx.Server;

  controllerList.forEach((controller) => {
    const controllerName = controller.split("/").pop().replace(".js", "");
    const controllerImport = require(controller)(ctx);

    Object.keys(controllerImport).forEach((key) => {
      if (key === "index") {
        Server.get("/" + controllerName, controllerImport[key]);
      }
      if (key === "create") {
        Server.post("/" + controllerName + "/create", controllerImport[key]);
      }
    });
  });
};
