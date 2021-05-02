const fs = require("fs");

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
      Locations.get("mappings").create(model, schema);
      return res.send({ message: "Not Found" });
    }
  });
};
