const fs = require("fs");
const template = require("./mustache");
var Mustache = require("mustache");

module.exports = function (ctx) {
  const Server = ctx.Server;
  const Locations = ctx.Locations;

  //   Server.post('/content/')

  Server.get("/content/:model", (req, res) => {
    const { model } = req.params;
    const schemaJson = require(Locations.get("mappings").get(model));
    return res.send(schemaJson);
  });

  Server.post("/content/create/:model", async (req, res) => {
    const { model } = req.params;
    const { schema } = req.body;
    const modelFile = Locations.get("mappings").get(model);
    if (modelFile) {
      Locations.get("mappings").update(model, schema);
      return res.send({ message: "Found" });
    } else {
      let controllerTemplate = template("controller");
      let modelTemplate = template("model");
      controllerTemplate = Mustache.render(controllerTemplate, {
        model: model,
        variable: model.toString().toLowerCase(),
      });
      modelTemplate = Mustache.render(modelTemplate, {});
      Locations.get("controllers").create(
        model.toString().toLowerCase(),
        controllerTemplate
      );
      Locations.get("mappings").create(model, schema);
      Locations.get("models").create(model, modelTemplate);
      return res.send({ message: "Not Found" });
    }
  });
};
