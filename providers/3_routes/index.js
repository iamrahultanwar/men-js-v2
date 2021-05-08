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
        Server.post("/" + controllerName, controllerImport[key]);
      }
      if (key === "show") {
        Server.get("/" + controllerName + "/:id", controllerImport[key]);
      }
      if (key === "update") {
        Server.put("/" + controllerName + "/:id", controllerImport[key]);
      }
      if (key === "delete") {
        Server.delete("/" + controllerName + "/:id", controllerImport[key]);
      }

      if (key === "query") {
        Server.post("/" + controllerName + "/query", controllerImport[key]);
      }
    });
  });
};
