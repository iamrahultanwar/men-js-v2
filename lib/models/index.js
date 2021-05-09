const loadModels = (ctx) => {
  const Models = () => {
    let models = new Map();
    const modelsList = ctx.container.Locations.get("models").all();
    modelsList.forEach(function (filePath) {
      const Locations = ctx.Locations;
      const modelName = filePath.split("/").pop().toString().replace(".js", "");
      const json = require(Locations.get("mappings").get(modelName));
      const schemaJson = Object.assign({}, JSON.parse(JSON.stringify(json)));
      const modelSchema = require(filePath)(
        new ctx.Database.Schema(sanitizeModelData(schemaJson, ctx.Database), {
          timestamps: true,
        })
      );
      models.set(modelName, new ctx.Database.model(modelName, modelSchema));
    });
    return models;
  };

  ctx.service("Models", Models);
};

const sanitizeModelData = (json, Database) => {
  const returnJson = { ...json };
  Object.keys(returnJson).forEach((key) => {
    if (typeof returnJson[key] === "object") {
      if (returnJson[key].hasOwnProperty("ref")) {
        returnJson[key].type = Database.Schema.Types.ObjectId;
      } else returnJson[key] = sanitizeModelData(returnJson[key], Database);
    }
  });
  return returnJson;
};
module.exports = function (c) {
  loadModels(c);
};